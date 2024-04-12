// import { Init, Provide, } from '@midwayjs/decorator';
// import { getModelForClass, mongoose, ReturnModelType } from '@typegoose/typegoose';
// import { PageResult } from '../dto/PageResult';
// import { LowcodeModel } from '../entity/LowcodeModel';


// @Provide()
// export class LowcodeModelService {

//     lowcodeModel: ReturnModelType<typeof LowcodeModel>;

//     @Init()
//     async init() {
//         // get model
//         this.lowcodeModel = getModelForClass(LowcodeModel);
//     }

//     async save(lcm: LowcodeModel) {
//         // get model
//         console.log(JSON.stringify(lcm));
//         if (lcm._id == "" || lcm._id == null || lcm._id == undefined) {
//             const { _id: id } = await this.lowcodeModel.create(lcm)
//             return id
//         } else {
//             // await this.lowcodeModel.findOneAndUpdate({ _id: lcm._id }, lcm); // 会返回对象
//             await this.lowcodeModel.updateOne({ _id: lcm._id }, lcm); // 不会返回对象
//             return await this.lowcodeModel.findById(lcm._id).exec();
//         }
//     }

//     async getModelInfo(id: string) {
//         let objectId = mongoose.Types.ObjectId;
//         if (!objectId.isValid(id)) {
//              return false
//         }
//         return await this.lowcodeModel.findById({ _id: id }).exec();
//     }

//     // 通用的筛选列表
//     async getModels(lcm: LowcodeModel, page: PageResult<any>): Promise<LowcodeModel[]> {
//         // return await this.lowcodeModel.find(
//         // { _id: lcm._id },
//         // { name: lcm.name },
//         // {status: lcm.status}
//         // { age: { $lte: lcm.age } },
//         // { age: { $gte: lcm.age } },
//         // ).skip(pNo * pSize).limit(pSize)

//         const query = this.lowcodeModel.find()
//         if (lcm._id != "" && lcm._id != null && lcm._id != undefined) {
//             query.find({'_id' : lcm._id})
//         }
//         if (lcm.name != "" && lcm.name != null && lcm.name != undefined) {
//             query.find({ 'name': { '$regex': lcm.name } })
//         }
//         if (lcm.status != undefined && lcm.status != null) {
//             query.find({ 'status' : lcm.status })
//         }
//         if (lcm.age != undefined && lcm.age != null) {
//             query.find({ 'age' : lcm.age })
//         }
//         if (lcm.survive != undefined && lcm.survive != null) {
//             query.find({ 'survive' : lcm.survive })
//         }
//         if (lcm.code != undefined && lcm.code != null) {
//             query.find({ 'code' : { '$regex': lcm.code } })
//         }
        
//         return await query
//         .skip(page.skip())
//         .limit(page.pageSize)
//         .sort({updatedAt:1})
//         .exec()
       
//     }

//     async delModel(ids: string) {
//         let objectId = mongoose.Types.ObjectId;
//         let idds: string[] = ids.split(',');
//         if (idds.length == 0) {
//             return false
//         }
//         idds.map((item)=>{
//             if (!objectId.isValid(item)) {
//                 return false
//             }
//         })
//         // 数组长度，若数组为0防止出现删除全部
//         return await this.lowcodeModel.deleteMany({ _id: { $in: ids.split(',') } }).select({ "_id": 1 })
//     }

// }
