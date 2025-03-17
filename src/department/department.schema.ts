import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "departments", versionKey: false })
export class Department {
   @ApiProperty({
      description: "Уникальный идентификатор",
      example: "66cb6fb8ebae2e4b8fffd190",
   })
   _id: string

   @ApiProperty({
      description: "Название факультета",
      example: "Факультет среднего профессионального образования",
   })
   @Prop({ required: true, unique: true })
   name: string

   @ApiProperty({
      description: "Сокращение названия",
      example: "СПО",
   })
   @Prop({ required: true, unique: true })
   abbreviation: string
}

export const DepartmentSchema = SchemaFactory.createForClass(Department)
export type DepartmentSchema = HydratedDocument<Department>
