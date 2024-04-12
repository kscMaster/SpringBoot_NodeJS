# lowcode-midway project

[Chinese](./README.zh-CN.md) | English

Dynamic completion of CRUD function according to request, poc stage

## 已知问题与缺失流程

- [x] 基础model以及CRUD
- [x] 自定义model以及CRUD
- [x] 统一入参的格式
- [x] 计算分页功能
- [x] 统一返回值
- [ ] 入参的`pageNo`在查询时需要做自减操作
- [x] 异常捕获
- [ ] 新增和修改前需要校验model
- [x] 修改和查询、删除前，需要做model存在校验，否则会生成很多垃圾collection
- [ ] 模型里的字段需要做校验（必填、范围、类型、枚举、敏感词过滤等）
- [ ] 方法调用前查询是否存在用户自定义的CRUD方法

||||
|:-:|:-:|:-:|
|2021年9月27日14:48:26|康晓平|<kangxp@nancal.com>|

-----------------------

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Configuration

1. change mongoDB config

### Deploy

```bash
$ npm start
$ npm stop
```

[midway]: https://midwayjs.org

### Swagger

`http://127.0.0.1:7001/swagger-ui/index.html`