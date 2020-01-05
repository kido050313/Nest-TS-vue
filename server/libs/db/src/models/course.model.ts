import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiModelProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: { // 等同于mongoose中schema定义传参
    timestamps: true,
    toJSON: { virtuals: true } // 查询虚拟字段
  }
})
export class Course {
  @ApiModelProperty({description: '课程名称'})
  @prop()
  name: string

  @ApiModelProperty({description: '课程封面'})
  @prop()
  cover: string

  @arrayProp({
    ref: 'Episode',
    localField: '_id',
    foreignField: 'course'
  }) // 这里可以用字符串也可以用变量，但是js循环引用可能造成值为空
  episodes: Ref<Episode>[]
}