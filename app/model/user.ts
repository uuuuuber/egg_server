import * as crypto from 'crypto';
import { Application } from 'typings/app';
export default (app: Application) => {
  const { INTEGER, STRING, DATE, BOOLEAN } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      allowNull: false,
      defaultValue: '',
      comment: '用户名',
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '密码',
      set(val: string) {
        const hmac = crypto.createHash('sha256', app.config.crypto.secret);
        hmac.update(val);
        const hash = hmac.digest('hex');
        this.setDataValue('password', hash);
      },
    },
    avatar: {
      type: STRING,
      allowNull: true,
      defaultValue: '',
      comment: '头像',
    },
    coin: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '金币',
    },
    ismerchant: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否是商家',
    },
    created_time: {
      type: DATE,
      get() {
        return app.formatTime(this.getDataValue('created_time'));
      },
    },
    updated_time: DATE,
  });

  return User;
};
