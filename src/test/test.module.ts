import { Module } from "@nestjs/common"
import { TestController } from "./test.controller"
import { TestService } from "./test.service"
import { MongooseModule } from "@nestjs/mongoose"
import { Test, TestSchema } from "./test.schema"
import { QuestionsModule } from "src/question/question.module"

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
      QuestionsModule,
   ],
   controllers: [TestController],
   providers: [TestService],
})
export class TestModule {}
