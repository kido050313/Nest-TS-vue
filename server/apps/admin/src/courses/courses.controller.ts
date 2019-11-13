import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model'
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
  model: Course
})
@Controller('courses')
@ApiUseTags('课程')
export class CoursesController {
  constructor(
    // ReturnModelType<typeof Course> 为类型提示，可写可不写
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>
  ){}
}
