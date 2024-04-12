import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as typegoose from '@midwayjs/typegoose';
const fs = require('fs');
import * as dotenv from 'dotenv';

dotenv.config();

@Configuration({
  imports: [
    typegoose, // 加载 typegoose 组件
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  // async onReady() {}
  async onReady(contanier: IMidwayContainer) {
    
    fs.readFile('./dbs/apiInfo.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      contanier.registerObject('apiInfoStr', data);
    })
    fs.readFile('./dbs/model.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      contanier.registerObject('modelStr', data);
    })
    // console.log('connected ', this.app)
  }

  async onStop() {
    // 关闭连接
  }
}
