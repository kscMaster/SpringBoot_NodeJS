import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserModel } from '../entity/UserModel';

@Provide()
export class TestService {

  @InjectEntityModel(UserModel)
  userModel: ReturnModelType<typeof UserModel>;

  async getTest(){
    // create data
    // an "as" assertion, to have types for all properties
    const { _id: id } = await this.userModel.create({ name: 'JohnDoe', jobs: ['Cleaner'] } as UserModel); 

    // find data
    const user = await this.userModel.findById(id).exec();
    console.log(user)
  }
}