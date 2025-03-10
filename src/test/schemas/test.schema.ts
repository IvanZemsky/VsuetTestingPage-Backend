import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { HydratedDocument } from "mongoose"

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
      description: "Максимальное число очков",
   })
   @Prop({ required: true })
   maxResult: number

   @ApiProperty({ example: 500, description: "Количество прохождений" })
   @Prop()
   passes: number

   @ApiProperty({
      example: "2024-08-25T10:03:46.000+00:00",
      description: "Дата создания теста",
   })
   @Prop({ required: true })
   date: string
}

export type TestDocument = HydratedDocument<Test>
export const TestSchema = SchemaFactory.createForClass(Test)
