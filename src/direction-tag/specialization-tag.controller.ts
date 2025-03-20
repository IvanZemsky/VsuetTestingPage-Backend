import { Controller, Get } from "@nestjs/common"
import { SpecializationTagService } from "./specialization-tag.service"

@Controller("specialization-tags")
export class SpecializationTagController {
   constructor(private specializationService: SpecializationTagService) {}

   @Get()
   async getAllSpecializationTags() {
      return await this.specializationService.getAllSpecializationTags()
   }
}
