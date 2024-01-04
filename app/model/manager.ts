import * as crypto from 'crypto';
import { Application } from 'typings/app';

export default (app: Application) => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const Manager = app.model.define('manager', {
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
      comment: '管理员账户',
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
    mobile: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '手机号',
    },
    created_time: {
      type: DATE,
      get() {
        return app.formatTime(this.getDataValue('created_time'));
      },
    },
    updated_time: DATE,
  });
  return Manager;
};
