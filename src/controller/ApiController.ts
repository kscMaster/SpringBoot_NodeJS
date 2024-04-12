import { Inject, Provide, Config, ALL, Controller, Get, Post, Del, Put, RequestPath, Query, Body, HttpCode } from '@midwayjs/decorator';
import { Context } from 'egg';
import { BaseResult } from '../dto/BaseResult';

@Provide()
@Controller('/api')
export class ApiController {

  @Inject()
  ctx: Context;

  //运维测试路由
  @Get('/hi')
  async hi(): Promise<BaseResult>{
    return new BaseResult()
  }

  
}
