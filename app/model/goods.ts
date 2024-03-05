import { Application } from 'typings/app';

export default (app: Application) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Goods = app.model.define('goods', {
    id: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },
    shopmanager: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '店长',
    },
    goodtitle: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '商品标题',
    },
    goodcover: {
      type: STRING,
      allowNull: true,
      defaultValue: '',
      comment: '商品入口封面',
    },
    goodbanner: {
      type: STRING,
      allowNull: true,
      defaultValue: '',
      comment: '商品banner图',
    },
    price: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: INTEGER(20),
      allowNull: false,
      comment: '商品价格',
    },
    created_time: {
      type: DATE,
      get() {
        return app.formatTime(this.getDataValue('created_time'));
      },
    },
    updated_time: DATE,
  });

  return Goods;
};
