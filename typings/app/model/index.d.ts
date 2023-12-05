// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportManager from '../../../app/model/manager';

declare module 'egg' {
  interface IModel {
    Manager: ReturnType<typeof ExportManager>;
  }
}
