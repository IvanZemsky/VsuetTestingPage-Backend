import { InjectModel } from "@nestjs/mongoose"
import { Direction } from "./direction.schema"
import { Model } from "mongoose"

export class DirectionService {
   constructor(
      @InjectModel(Direction.name) private directionModel: Model<Direction>,
   ) {}

   async getAllDirections(): Promise<Direction[]> {
      return this.directionModel.find().exec()
   }
}
