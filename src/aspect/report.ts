// import { App, Aspect, IMethodAspect, JoinPoint, Logger, Provide } from '@midwayjs/decorator';
// import { BaseApiController } from '../controller/BaseApiController';
// import { DIYModelController } from '../controller/DIYModelController';
// import { ILogger } from '@midwayjs/logger';
// import MyError from './my-error';
// import { Application } from '@midwayjs/web';


// @Provide()
// @Aspect([BaseApiController, DIYModelController])
// export class ReportInfo implements IMethodAspect {

//   @Logger()
//   logger: ILogger

//   @App()
//   app: Application

//   async around(point: JoinPoint) {

//     // 控制器前执行的逻辑
//     this.logger.info('args --->>> ' + point.args)
//     console.log(point)
//     const startTime = Date.now();
//     // TODO 获取request的body
    
//     try {
//       const result = await point.proceed(...point.args);  // 执行原方法
//       const execTime = Date.now() - startTime;
//       this.logger.info('exec time --->>> ' + execTime)
//       return result;
//     } catch (error) {
//       if (error instanceof MyError) {
//         point.target.ctx.body = { code: error['code'], msg: error['message'] }
//       } else {
//         point.target.ctx.body = { code: 0, msg: 'Internal Server Error' }
//       }
//       this.logger.info('args --->>> ' + error)
//       return
//     }
//   }

// }