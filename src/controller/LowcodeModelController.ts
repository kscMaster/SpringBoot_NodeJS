import {
    Inject,
    Controller, Post, ALL, HttpCode, Provide, ContentType, Body, Param,
    //  Get, Param, Put, Validate, Del, All
} from '@midwayjs/decorator';

import { Context } from 'egg';
import { BaseResult } from '../dto/BaseResult';
// import { LowcodeModelService } from '../service/BaseModelService';
import { LowcodeModel } from '../entity/LowcodeModel';
import { PageResult } from '../dto/PageResult';

@Provide()
@Controller('/lowcode/model')
export class LowcodeModelController {

    @Inject()
    ctx: Context;

    // @Inject()
    // lowcodeModelService: LowcodeModelService;

    // 新增、更新
    @Post('/save')
    @ContentType('json')
    async add(
        @Body(ALL) user: LowcodeModel): Promise<BaseResult> {
        // const newUser = await this.lowcodeModelService.save(user);
        const newUser = {};
        console.log(JSON.stringify(newUser));
        const br = new BaseResult();
        br.data = newUser
        return br
    }

    // 获取详情
    @Post('/detail/:id')
    @ContentType('json')
    @HttpCode(200)
    async getInfo(@Param('id') uid: string):
        Promise<BaseResult> {
        // const user = await this.lowcodeModelService.getModelInfo(uid);
        const user = {};
        if (user === null) {
            return { code: 404, msg: 'NOT FOUND', data: null };
        }
        return { code: 200, msg: 'OK', data: user };
    }

    // 获取列表
    @Post('/list/:pageNo/:pageSize')
    @ContentType('json')
    async getList(
        @Body(ALL) model?: LowcodeModel,
        @Param('pageNo') pNo?: number,
        @Param('pageSize') pSize?: number
    ): Promise<BaseResult> {
        let pr = new PageResult(pNo, pSize)
        // const users = await this.lowcodeModelService.getModels(model, pr);
        let users = {};
        const result = new BaseResult();
        result.data = users;
        return result;
    }

    // 删除
    @Post('/del/:ids')
    @ContentType('json')
    async del(
        @Param('ids') ids: string) {

        // const result = await this.lowcodeModelService.delModel(ids);
        let result = {};
        const br = new BaseResult();
        br.data = result;
        return br;
    }

    // // 无效请求
    // @All()
    // async refused() {
    //     return 'req was refused';
    // }

    // // 无聊加点糖
    // @Get('/index')
    // async index() {
    //     return 'Hello baby!';
    // }

    //测试各种参数
//   @Post('/test/:name')
//   async test(): Promise<BaseResult>{
  
    
//     //header
//     console.log('header:',this.ctx.header);
    
//     // ?id=1
//     console.log('query:',this.ctx.query);

//     // /:name
//     console.log('params:',this.ctx.params);

//     // post
//     console.log('body:',this.ctx.request.body);

//     //cookies this.ctx.cookies.set() / get()
//     // console.log('cookies:',this.ctx.cookies);

//     //session
//     console.log('session:',this.ctx.session);
    
//     return new BaseResult()
//   }

}