import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { Answer } from "./types/types"
import { questionsExample } from "./docs/docs"
import { Test } from "src/test/schemas/test.schema"

@Schema({ collection: "questions", versionKey: false })
export class Question {
   @ApiProperty({
      description: "Уникальный идентификатор вопроса в базе данных",
      example: "66d0d0c6a63f85b540d92934",
   })
   _id: ObjectId

   @ApiProperty({
      description: "Уникальный идентификатор теста, к которой принадлежит вопрос",
      example: "66cb6fb8ebae2e4b8fffd190",
   })
   @Prop({ type: mongoose.Schema.Types.ObjectId })
   testId: Test

   @ApiProperty({
      description: "Заголовок вопроса",
      example: "Считаете ли Вы, что компьютеры и программирование - это интересно?",
   })
   @Prop()
   title: string

   @ApiProperty({
      description: "Варианты ответов к вопросу",
      example: questionsExample,
   })
   @Prop()
   answers: Answer[]
}

export type QuestionDocument = HydratedDocument<Question>
export const QuestionSchema = SchemaFactory.createForClass(Question)
