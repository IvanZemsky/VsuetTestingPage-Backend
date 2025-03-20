import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { SpecializationTag } from "./specialization-tag.schema"

export class SpecializationTagService {
   constructor(
      @InjectModel(SpecializationTag.name) private specializationModel: Model<SpecializationTag>,
   ) {}

   async getAllSpecializationTags(): Promise<SpecializationTag[]> {
      return this.specializationModel.find().exec()
   }
}
