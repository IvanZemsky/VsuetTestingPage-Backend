import { Controller, Get } from "@nestjs/common";
import { DirectionService } from "./direction.service";

@Controller("directions")
export class DirectionController {
   constructor(
      private directionService: DirectionService,
   ) {}

   @Get()
   async getAllDirections() {
      return await this.directionService.getAllDirections()
   }
}
