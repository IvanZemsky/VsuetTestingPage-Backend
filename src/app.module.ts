import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { TestModule } from "./test/test.module"
import { QuestionsModule } from "./question/question.module"

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ".env",
         isGlobal: true,
      }),
      MongooseModule.forRoot(
         `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      ),
      TestModule,
      QuestionsModule,
      UserModule,
      AuthModule,
   ],
})
export class AppModule {}
