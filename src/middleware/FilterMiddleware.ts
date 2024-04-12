import { Provide,  Logger } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext, } from '@midwayjs/web';
import { Context } from 'egg';
import MyError from '../aspect/my-error';
import { ACTION } from '../entity/CommonEnum';
import { ILogger } from '@midwayjs/logger';

@Provide()
export class FilterMiddleware implements IWebMiddleware {

    @Logger()
    logger: ILogger
    
    // @Inject()
    // lowcodeModelController: LowcodeModelController;

    resolve() {
        return async (ctx: Context, next: IMidwayWebNext) => {

            let allPath = ctx.url.split('/')
            // 校验action操作
            if (!(allPath[3] in ACTION) && false) {
                ctx.response.status = 404
                return;
            }

            // 记录日志与异常
            const startTime = Date.now();
            this.logger.info('requestTime --->>> ' + startTime)
            this.logger.info('args --->>> ' + ctx.request.URL)
            this.logger.info('body --->>> ' + JSON.stringify(ctx.request.body))
            
            try {
                const execTime = Date.now() - startTime;
                await next()
                this.logger.info('execTime --->>> ' + execTime)

            } catch (error) {
                // ctx.response.status = 200
                if (error instanceof MyError) {
                    ctx.response.body = { code: error['code'], msg: error['message'] }
                } else {
                    ctx.response.body = { code: 0, msg: 'Internal Server Error' }
                }
                this.logger.error('error --->>> ' + error)
                return
            }

        };
    }

    // 通用的拦截
    async record(ctx: Context<any>) {
        // 控制器前执行的逻辑
        console.log(ctx.URL.host);
        console.log(ctx.URL.hostname);
        console.log(ctx.URL.protocol);
        console.log(ctx.URL.origin);
        console.log(ctx.URL.href);
        console.log(ctx.URL.pathname);
        console.log(ctx.URL.toJSON);


    }

}