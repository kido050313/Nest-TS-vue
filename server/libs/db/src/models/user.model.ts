import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiModelProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: { // 等同于mongoose中schema定义传参
    timestamps: true 
  }
})
export class User {
  @ApiModelProperty({description: '用户名', example: 'user1'}) // swagger api文档说明
  @prop()
  username: string

  @ApiModelProperty({description: '密码', example: 'pass1'})
  @prop()
  password: string
}