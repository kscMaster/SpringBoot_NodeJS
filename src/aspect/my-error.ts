export default class MyError extends Error {
  code: number;
  data: any[] | undefined;
  msg?: unknown;

  /**
   * 全局自定义错误结构
   * 可以接受多条错误信息，用于业务抛错
   * @param msg 错误信息
   * @param code 状态码。
   * @param data 错误内容，仅输出在控制台或文件中
   */
  constructor(msg: string, code?: number, errors?: any[]) {
    super(msg);
    this.code = typeof code === 'number' ? code : 0;
    this.data = errors;
  }
}