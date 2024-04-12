import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632295242414_294';

  // add your config here
  config.middleware = [
    // 'logMiddleware',
    // 'ErrorHandlerMiddleware',
    'filterMiddleware'
  ];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // config.security = {
  //   csrf: false,
  // };

  return config;
};

/**
 * mongoDB连接配置
 */
 export const mongoose = {
   client: {
    //  uri:'mongodb://dev:123@mongo:27017/lowcode',
     uri: 'mongodb://127.0.0.1:27017',
     options: {
       useNewUrlParser: true, 
       // useUnifiedTopology: true, 
       dbName: 'test1',
       // user: 'admin', 
       // pass: '123456'
     }
   }
};

