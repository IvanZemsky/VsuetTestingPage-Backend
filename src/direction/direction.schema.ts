import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { HydratedDocument } from "mongoose"

@Schema({ collection: "directions", versionKey: false })
export class Direction {
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
}

export const DirectionSchema = SchemaFactory.createForClass(Direction)
export type DirectionSchema = HydratedDocument<Direction>
