import { InjectModel } from "@nestjs/mongoose"
import { Department } from "./department.schema"
import { Model } from "mongoose"

export class DepartmentService {
   constructor(
      @InjectModel(Department.name) private departmentModel: Model<Department>,
   ) {}

   async getAllDepartments(): Promise<Department[]> {
      return this.departmentModel.find().exec()
   }
}
