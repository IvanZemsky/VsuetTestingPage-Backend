import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Direction, DirectionSchema } from "./direction.schema"
import {DirectionController} from "./direction.controller"
import { DirectionService } from "./direction.service"

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Direction.name, schema: DirectionSchema }]),
   ],
   controllers: [DirectionController],
   providers: [DirectionService],
})
export class DirectionModule {}