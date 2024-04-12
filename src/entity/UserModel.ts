import { prop } from '@typegoose/typegoose';
import { EntityModel } from '@midwayjs/typegoose';

@EntityModel()
export class UserModel {
  @prop()
  public name?: string;

  @prop({ type: () => [String] })
  public jobs?: string[];
}