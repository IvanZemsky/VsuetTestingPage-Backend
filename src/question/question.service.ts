import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Question } from "./question.schema"
import { Model } from "mongoose"

@Injectable()
export class QuestionService {
   constructor(
      @InjectModel(Question.name)
      private questionModel: Model<Question>,
   ) {}

   async getQuestionsByTestId(testId: string) {
      const questions = await this.questionModel.find({ testId })
      return questions
   }

   async getQuestion(searchParams: { testId?: string; number?: string }) {
      const question = await this.questionModel.findOne(searchParams).lean()
      return question
   }

   async incrementPasses(testId: string, questionNumber: string) {
      const question = await this.questionModel.findOneAndUpdate(
         { testId, number: questionNumber },
         { $inc: { passes: 1 } },
         { new: true },
      )
      return question
   }
}
