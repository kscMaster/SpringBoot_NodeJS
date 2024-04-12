import {
    Inject,
    Controller, Post, Provide, RequestPath
    //  Get, Param, Put, Validate, Del, All
} from '@midwayjs/decorator';

import { Context } from 'egg';
import { BaseResult } from '../dto/BaseResult';
import { ACTION } from '../entity/CommonEnum';
import { DIYModelService } from '../service/DIYModelService';

/**
 * 自定义的接口
 */
@Provide()
@Controller('/diy-api')
export class DIYModelController {

    @Inject()
    ctx: Context;

    @Inject()
    dIYService: DIYModelService;

    // 拦截一切请求
    @Post('/*')
    async filter(
        @RequestPath() path: string
    ): Promise<BaseResult> {

        if (path.endsWith('/hi')){
            return new BaseResult()
        }

        let allPath = path.split('/')
        const br = new BaseResult()

        // 根据不同的action路由不同的接口
        if (allPath[3] == ACTION.save) {

            br.data = await this.dIYService.save(allPath[2], this.ctx.request.body)

        } else if (allPath[3] == ACTION.detail) {

            const result = await this.dIYService.detail(allPath[2], allPath[4])

            br.data = result

        } else if (allPath[3] == ACTION.list) {

            br.data = await this.dIYService.list(path, allPath[2], this.ctx.request.body)

        } else if (allPath[3] == ACTION.delete) {

            const result = await this.dIYService.delete(allPath[2], allPath[4])
            br.data = result

        }
        return br
    }

}

// function getSpliceArray(allPath: string[], pos1: number, pos2: number): string {
//     let temp = Object.assign([], allPath);
//     return temp.splice(pos1, pos2).join('/')
// }
