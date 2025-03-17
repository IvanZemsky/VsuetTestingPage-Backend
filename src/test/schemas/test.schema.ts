import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import mongoose, { HydratedDocument } from "mongoose"
import { Tag, Subject, Qualification } from "../types/types"
import { Department } from "src/department/department.schema"
import { Direction } from "src/direction/direction.schema"

@Schema({ collection: "tests", versionKey: false })
export class Test {
   @ApiProperty({
      example: "66cb6fb8ebae2e4b8fffd190",
      description: "Уникальный идентификатор",
   })
   _id: string

   @ApiProperty({
      example: "Информационные системы и программирование",
      description: "Название теста",
   })
   @Prop({ required: true })
   name: string

   @ApiProperty({
      example: "Студенты получают знания в области...",
      description: "Описание теста",
   })
   @Prop({ required: true })
   description: string

   @ApiProperty({
      example: "https://images.unsplash.com/photo-123",
      description: "Ссылка на изображение",
   })
   @Prop({ required: true })
   img: string

   @ApiProperty({
      example: 50,
      description: "Вступительные испытания",
   })
   @Prop({ required: true })
   entranceTests: Subject[]

   @ApiProperty({
      example: "09.02.07",
      description: "Код специальности",
   })
   @Prop({ required: true })
   specializationCode: string

   @ApiProperty({
      example: 50,
      description: "Теги специальности",
   })
   @Prop({ required: true })
   tags: Tag[]

   @ApiProperty({
      description: "ID факультета, к которому относится тест",
      example: "66cb6fb8ebae2e4b8fffd190",
   })
   @Prop({ type: mongoose.Schema.Types.ObjectId })
   department: Department

   @ApiProperty({
      description: "ID факультета, к которому относится тест",
      example: "66cb6fb8ebae2e4b8fffd190",
   })
   @Prop({ type: mongoose.Schema.Types.ObjectId })
   direction: Direction

   @ApiProperty({
      example: "Бакалавриат",
      description: "Квалификация",
   })
   @Prop({ required: true })
   qualification: Qualification

   @ApiProperty({ example: 500, description: "Количество прохождений" })
   @Prop()
   passes: number
}

export type TestDocument = HydratedDocument<Test>
export const TestSchema = SchemaFactory.createForClass(Test)
