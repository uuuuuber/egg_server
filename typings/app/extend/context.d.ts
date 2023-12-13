// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExtendContext from '../../../app/extend/context';
type ExtendContextType = typeof ExtendContext;
interface options {
  order?: any[]
}
interface CTX extends Context{
  // 成功提示
  apiSuccess(data:string, msg: string, code: number): void;

  // 失败提示
  apiFail(data:string, msg: string, code: number): void;

  // 分页
  page(modelName: string, where = {}, options: options = {})
}
declare module 'egg' {
  interface Context extends ExtendContextType { }
}