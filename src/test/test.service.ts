import { InjectModel } from "@nestjs/mongoose"
import { Model, MongooseBaseQueryOptions } from "mongoose"
import { NotFoundException } from "@nestjs/common"
import { Test } from "./schemas/test.schema"

type FilterParams = {
   search: string
   department: string
   direction: string
   qualification: string
   entranceTests: string[]
}

type FullSearchParams = FilterParams & {
   limit: number
   page: number
}

export class TestService {
   constructor(@InjectModel(Test.name) private testModel: Model<Test>) {}

   async getAllTests(filterParams: FullSearchParams): Promise<Test[]> {
      const { page, limit, ...options } = filterParams
      const skip = page ? (page > 0 ? page - 1 : 0) * limit : 0
      const query = this.setQuery(options)
      const tests = await this.testModel.find(query).skip(skip).limit(limit).lean()

      return tests
   }

   async getTestById(testId: string) {
      const test = await this.testModel.findById(testId).lean()

      if (!test) {
         throw new NotFoundException()
      }

      return test
   }

   async getTestCount(options: FullSearchParams): Promise<number> {
      const query = this.setQuery(options)
      return await this.testModel.countDocuments(query).exec()
   }

   private setQuery(options: FilterParams) {
      const { search, entranceTests, direction, department, qualification } = options
      const query: MongooseBaseQueryOptions = {
         ...(search && {
            $or: [
               { description: { $regex: search, $options: "i" } },
               { name: { $regex: search, $options: "i" } },
            ],
         }),
         ...(entranceTests?.length && {
            entranceTests: {
               $all: entranceTests.map((test) => new RegExp(test, "i")),
            },
         }),
         ...(direction && { direction }),
         ...(department && { department }),
         ...(qualification && { qualification }),
      }

      if (!entranceTests?.length) {
         delete query.entranceTests
      }

      return query
   }

   async updatePasses(id: string) {
      const test = await this.testModel.findByIdAndUpdate(
         id,
         { $inc: { passes: 1 } },
         { new: true, useFindAndModify: false },
      )

      if (!test) {
         throw new NotFoundException(`Test with ID "${id}" not found`)
      }

      return {
         testId: test._id,
         passes: test.passes,
      }
   }
}
