import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiUseTags } from '@nestjs/swagger';

@Crud({
  model: Episode
})
@ApiUseTags('课时')
@Controller('episodes')
export class EpisodesController {
  constructor(
    // ReturnModelType<typeof Course> 为类型提示，可写可不写
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>
  ){}

  @Get('option')
  option() {
    return {
      title: "课时管理",
      column: [
        { prop: "name", label: "课时名称" }
        // { prop: "cover", label: "课程封面图" }
      ]
    }
  }
}
