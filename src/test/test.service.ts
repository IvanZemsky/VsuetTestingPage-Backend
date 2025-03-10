import { InjectModel } from "@nestjs/mongoose"
import { Model, QueryOptions } from "mongoose"
import { NotFoundException } from "@nestjs/common"
import { Test } from "./schemas/test.schema"

export class TestService {
   constructor(
      @InjectModel(Test.name) private testModel: Model<Test>,
   ) {}

   async getAllTests(
      search: string,
      limit: number = 0,
      page?: number,
   ): Promise<Test[]> {
      const skip = page ? (page > 0 ? page - 1 : 0) * limit : 0
      const query = this.setQuery(search)
      const tests = await this.testModel
         .find(query)
         .skip(skip)
         .limit(limit)
         .lean()

      return tests
   }

   async getTestById(testId: string) {
      const test = await this.testModel
         .findById(testId)
         .lean()

      if (!test) {
         throw new NotFoundException()
      }

      return test
   }

   async getTestCount(search: string): Promise<number> {
      const query = this.setQuery(search)
      return await this.testModel.countDocuments(query).exec()
   }

   private setQuery(
      search: string,
   ): QueryOptions {
      return {
         $or: [
            { description: { $regex: search, $options: "i" } },
            { name: { $regex: search, $options: "i" } },
         ],
      }
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
