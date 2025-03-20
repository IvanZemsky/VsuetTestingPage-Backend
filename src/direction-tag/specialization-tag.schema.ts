import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "specialization-tags", versionKey: false })
export class SpecializationTag {
   @ApiProperty({
      description: "Уникальный идентификатор",
      example: "66cb6fb8ebae2e4b8fffd190",
   })
   _id: string

   @ApiProperty({
      description: "Название направления",
      example: "Пищевые технологии",
   })
   @Prop({ required: true, unique: true })
   name: string

   @ApiProperty({
      description: "Символ тега",
      example: "W",
   })
   @Prop({ required: true, unique: true })
   symbol: string
}

export const SpecializationTagSchema = SchemaFactory.createForClass(SpecializationTag)
export type SpecializationTagSchema = HydratedDocument<SpecializationTag>
