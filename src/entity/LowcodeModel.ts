import { modelOptions, prop } from '@typegoose/typegoose';
import BaseCollection from './BaseCollection';

@modelOptions({ schemaOptions: { _id: true } })
export class LowcodeModel extends BaseCollection {

  @prop()
  public name?: string;

  @prop()
  public status?: number;

  @prop()
  public age?: number;

  @prop()
  public survive?: boolean;

  @prop()
  public code?: string;
}