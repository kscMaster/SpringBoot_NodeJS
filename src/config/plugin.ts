import { EggPlugin } from 'egg';
export default {
  logrotator: false, // disable when use @midwayjs/logger
  static: false,
} as EggPlugin;


exports.cors = {
  enable: true,
  package: 'egg-cors',
};