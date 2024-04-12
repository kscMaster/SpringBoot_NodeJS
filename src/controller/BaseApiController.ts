// import {
//     Inject,
//     Controller, Post, ALL, Provide, Body, RequestPath,
//     //  Get, Param, Put, Validate, Del, All
// } from '@midwayjs/decorator';

// import { Context } from 'egg';
// import { BaseResult } from '../dto/BaseResult';
// import { LowcodeModelService as BaseModelService } from '../service/BaseModelService';
// import { LowcodeModel } from '../entity/LowcodeModel';
// import { ACTION } from '../entity/CommonEnum';
// import { PageResult } from '../dto/PageResult';
// /**
//  * 基础api的接口
//  */
// @Provide()
// @Controller('/base-api')
// export class BaseApiController {

//     @Inject()
//     ctx: Context;

//     @Inject()
//     baseModelService: BaseModelService;

//     // 拦截一切请求
//     @Post('/*')
//     async filter(
//         @RequestPath() path: string,
//         @Body(ALL) model?: LowcodeModel
//     ): Promise<BaseResult> {
//         let allPath = path.split('/')
//         console.log(allPath)

//         const br = new BaseResult();

//         // 根据不同的action路由不同的接口
//         if (allPath[3] == ACTION.save) {

//             br.data = await this.baseModelService.save(model)
       
//         }
//         if (allPath[3] == ACTION.detail) {

//             const result = await this.baseModelService.getModelInfo(allPath[4])
//             if (result == null) {
//                 br.code = 0
//                 br.msg = '数据未找到'
//             } else if (!result) {
//                 br.code = 0
//                 br.msg = '非法参数'
//             } else {
//                 br.data = result
//             }
//         }

//         if (allPath[3] == ACTION.list) {

//             let pr = new PageResult(allPath[4], allPath[5])
//             br.data = await this.baseModelService.getModels(model, pr)
//         }
//         if (allPath[3] == ACTION.delete) {

//             const result = await this.baseModelService.delModel(allPath[4])
//             if (!result) {
//                 br.code = 400
//                 br.msg = '非法参数'
//             } else {
//                 br.data = result
//             }
//         }
//         return br
//     }

// }