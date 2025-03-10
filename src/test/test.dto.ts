import { Question } from "src/question/question.schema"

export type SceneType = "default" | "end"

export type CreateTestDto = {
   readonly name: string
   readonly description: string
   readonly img: string
   readonly scenes: Question[]
}
