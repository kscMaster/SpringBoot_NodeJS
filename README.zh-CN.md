# lowcode-midway project

[English](./README.md) | 简体中文

根据请求动态完成CRUD的功能，poc阶段

## 已知问题与缺失流程

- [x] 基础model以及CRUD
- [x] 自定义model以及CRUD
- [x] 统一入参的格式
- [x] 计算分页功能
- [x] 统一返回值
- [ ] 入参的`pageNo`在查询时需要做自减操作
- [x] 异常捕获缺失
- [x] 修改和查询、删除前，需要做model存在校验，否则会生成很多垃圾collection
- [ ] 模型里的字段需要做校验（必填、范围、类型、枚举、敏感词过滤等）
- [ ] 方法调用前查询是否存在用户自定义的CRUD方法

||||
|:-:|:-:|:-:|
|2021年9月27日14:48:26|康晓平|<kangxp@nancal.com>|

-----------------------

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档][midway]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```
### Configuration

1. 修改 mongoDB 配置


### 部署

```bash
$ npm start
$ npm stop
```

[midway]: https://midwayjs.org

### Swagger

`http://127.0.0.1:7001/swagger-ui/index.html`