const WebFramework = require('@midwayjs/web').Framework;
// 加载主 web 框架
const web = new WebFramework().configure({
  port: 80,
});

const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap
  .load(web)
  .run();