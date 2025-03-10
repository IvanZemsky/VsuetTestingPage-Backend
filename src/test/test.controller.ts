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
   async gettests(
      @Res() res: Response,
      @Query("limit") limit?: number,
      @Query("page") page?: number,
      @Query("search") search: string = "",
      @Query("only_count") onlyCount: boolean = false,
   ) {
      const count = await this.testService.getTestCount(search)

      res.setHeader("X-Total-Count", count)
      res.setHeader("Access-Control-Expose-Headers", "X-Total-Count")

      if (!onlyCount) {
         const tests = await this.testService.getAllTests(search, limit, page)

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
