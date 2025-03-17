import { TestService } from "./test.service"
import { Response } from "express"
import {
   Controller,
   Get,
   Res,
   Param,
   NotFoundException,
   Patch,
   Query,
} from "@nestjs/common"
import { QuestionService } from "src/question/question.service"

@Controller("tests")
export class TestController {
   constructor(
      private testService: TestService,
      private questionService: QuestionService,
   ) {}

   @Get()
   async getTests(
      @Res() res: Response,
      @Query("limit") limit: number = 0,
      @Query("page") page: number,
      @Query("search") search: string = "",
      @Query("qualification") qualification: string = "",
      @Query("entrance_tests") entranceTests: string = "",
      @Query("direction") direction: string = "",
      @Query("department") department: string = "",
      @Query("only_count") onlyCount: boolean = false,
   ) {
      const filters = {
         search,
         limit,
         page,
         qualification,
         entranceTests: entranceTests.length ? entranceTests.split(",") : [],
         direction,
         department,
      }

      const count = await this.testService.getTestCount(filters)

      res.setHeader("X-Total-Count", count)
      res.setHeader("Access-Control-Expose-Headers", "X-Total-Count")

      if (!onlyCount) {
         const tests = await this.testService.getAllTests(filters)

         return res.json(tests)
      }

      return res.json([])
   }

   @Get(":testId")
   async getTestById(@Param("testId") testId: string) {
      const test = await this.testService.getTestById(testId)

      if (!test) {
         throw new NotFoundException()
      }

      return test
   }

   @Patch(":testId/passes")
   async updatePasses(@Param("testId") testId: string) {
      const updatedPasses = await this.testService.updatePasses(testId)
      return updatedPasses
   }

   @Get(":testId/questions")
   async getQuestionsByTestId(@Param("testId") testId: string) {
      const questions = await this.questionService.getQuestionsByTestId(testId)
      if (!questions.length) {
         throw new NotFoundException()
      }
      return questions
   }

   @Patch(":testId/passes/:questionId")
   async incrementPasses(
      @Param("testId") testId: string,
      @Param("questionId") questionId: string,
   ) {
      return await this.questionService.incrementPasses(testId, questionId)
   }
}
