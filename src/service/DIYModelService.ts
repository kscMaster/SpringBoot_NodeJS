import { Provide, } from '@midwayjs/decorator';
import { mongoose } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import LowCodeError from '../aspect/my-error';
import { PageResult } from '../dto/PageResult';
mongoose.set('debug', true)

@Provide()
export class DIYModelService {

    async save(modelName: string, body: any) {
        const model = await this.getModel(modelName);
        // 校验模型是否正确
        // 新增
        if (body['_id'] == "" || body['_id'] == null || body['_id'] == undefined) {
            const { _id: id } = await model.create(body)
            return id
        }
        // 更新
        if (await  this.existsModel(modelName) == false)  {
            throw new LowCodeError('不存在的模块', 0 , null)
        }
        const temp = await model.findById(body['_id']).exec()
        if (temp == null) {
            throw new LowCodeError('id不存在', 0, null)
        }

        await model.updateOne({ _id: body['_id'] }, body); // 不会返回对象
        return await model.findById(body['_id']).exec();
    }

    async detail(modelName: string, id: string) {
        if (await this.existsModel(modelName) == false) {
            throw new LowCodeError('不存在的模块', 0 , null)
        }

        let objectId = mongoose.Types.ObjectId;
        if (!objectId.isValid(id)) {
            throw new LowCodeError('参数ID非法', 0, null)
        }
        const model = await this.getModel(modelName);
        return await model.findById({ _id: id }).exec();
    }

    // 筛选列表
    async list(path: string, modelName: string, body: any): Promise<PageResult<any>> {
        if (await this.existsModel(modelName) == false) {
            throw new LowCodeError('不存在的模块', 0 , null)
        }
        const model = await this.getModel(modelName)
        const queryModel = model.find()

        // 查找apiInfo内对应的查询条件，根据查询条件拼接后面的条件
        const apiModel = await this.getModel('apiInfo')
        const paramsObj = await apiModel.findOne(
            { "interfaceUrl": { $regex: path } }, { "params": 1 }
        ).exec()
        let params = paramsObj.get('params')

        let pr = new PageResult(body['pageNo'], body['pageSize'])

        // 遍历查询条件对象，如果key存在，则与params里相同的key的操作符进行拼接
        for (const [key, value] of Object.entries(body['data'])) {

            params.forEach((val, idx, array) => {
                // val: 当前值
                // idx：当前index
                // array: Array
                if (val.code == [key]) {
                    // 根据operator拼接query
                    this.appendQuery(queryModel, val.operator, key, value + '')
                    return
                }
            });
        }
        // @ts-ignore
        let count = await queryModel.find().clone().count(queryModel.getQuery())
        if (count = 0) { // 查询到的总数为0 ，就不做查询了，直接返回分页
            return pr
        }
        const result = await queryModel
            .skip(pr.skip())
            .limit(pr.pageSize)
            .sort({ updatedAt: 1 })
            .exec()

        //https://mongoosejs.com/docs/migrating_to_6.html#duplicate-query-execution
        //Mongoose no longer allows executing the same query object twice. If you do, you'll get a error. Executing the same query instance twice is typically indicative of mixing callbacks and promises, but if you need to execute the same query twice, you can call to clone the query and re-execute it.

        pr.setPageResult(count, result)
        return pr
    }

    async delete(modelName: string, ids: string) {
        let objectId = mongoose.Types.ObjectId;
        let idds: string[] = ids.split(',');
        if (idds.length == 0) {
            throw new LowCodeError('至少需要一个ID', 0, null)
        }
        idds.map((item) => {
            if (!objectId.isValid(item)) {
                throw new LowCodeError('参数ID非法', 0, null)
            }
        })
        if (await this.existsModel(modelName) == false) {
            throw new LowCodeError('不存在的模块', 0 , null)
        }
        const model = await this.getModel(modelName);
        // 数组长度，若数组为0防止出现删除全部
        // return await this.lowcodeModel.findByIdAndDelete({ _id: idds[0] })
        return await model.deleteMany({ _id: { $in: ids.split(',') } }).select({ "_id": 1 })
    }


    /** Local methods */

    /**
    * 根据查询条件动态拼接参数
    * @param query 查询对象
    * @param operator 操作符
    * @param key 查询的字段
    * @param condition 查询条件
    * @return 拼接好的查询对象
     */
    async appendQuery(query: mongoose.Query<(mongoose.Document<any, any, unknown> & { _id: unknown; })[], mongoose.Document<any, any, unknown> & { _id: unknown; }, {}, unknown>,
        operator: string, key: string, condition: string) {
        if (operator == 'eq') {
            query.find({ [key]: condition })
        } else if (operator == 'Neq') {
            query.find({ [key]: { $ne: condition } })
        } else if (operator == 'Like') {
            query.find({ [key]: { $regex: condition } })
        } else if (operator == 'NotLike') {
            query.find({ [key]: { $not: condition } })
        } else if (operator == 'Gte') {
            query.find({ [key]: { $gte: condition } })
        } else if (operator == 'Lte') {
            query.find({ [key]: { $lte: condition } })
        } else if (operator == 'Between') {
            let cond = condition.split(',')
            query.find({
                '$and': [
                    {
                        [key]: {
                            $gte: Number(cond[0])
                        }
                    },
                    {
                        [key]: {
                            $lte: Number(cond[1])
                        }
                    }
                ]
            }
            )
        }
    }

    /**
     * 获取动态模型
     * @param modelName 模型名
     * @returns 
     */
    async getModel(modelName: string): Promise<mongoose.Model<unknown, {}, {}, {}>> {
        let model
        try {
            model = mongoose.model(modelName)
        } catch (error) {
            // 创建Schema对象（约束）,disable 严格模式，去除版本`_v`字段，自动加时间戳CreateAt与UpdateAt字段
            const newSchema = new Schema({}, { strict: false, versionKey: false, timestamps: true });
            //将schema映射到一个MongoDB collection并定义这个文档的构成,(模型名,约束对象,强行指定collection名)
            model = mongoose.model(modelName, newSchema, modelName)
        }
        // TODO 或许可以使用以下方式判断是否已经存在model
        // mongoose.modelNames().find(modelName)
        return model
    }

    /**
     * 根据modelName判断是否存在collection
     * @param modelName 
     * @returns 
     */
    async existsModel(modelName: string): Promise<Boolean> {
        const temp = await mongoose.connection.db.listCollections()

        for (let item of await temp.toArray()) {
            if (item.name == modelName) {
                return true
            }
        }
        return false
    }

    /**
     * 根据code值获取对应的properties
     * @param name model name
     * @returns properties
     */
    // async getModelByCode(name: string): Promise<mongoose.Document<any, any, unknown>> {
    //     const result = await this.stuModle.findOne({ 'code': name }).exec()
    //     var properties = result.get("properties")
    //     return properties
    // }

}
