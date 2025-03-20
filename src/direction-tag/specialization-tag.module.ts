import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { SpecializationTag, SpecializationTagSchema } from "./specialization-tag.schema"
import { SpecializationTagController } from "./specialization-tag.controller"
import { SpecializationTagService } from "./specialization-tag.service"

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: SpecializationTag.name, schema: SpecializationTagSchema },
      ]),
   ],
   controllers: [SpecializationTagController],
   providers: [SpecializationTagService],
})
export class SpecializationTagModule {}
