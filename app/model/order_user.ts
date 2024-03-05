import { Application } from 'typings/app';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const OrderUser = app.model.define('order_user', {
    id: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '哪个user买的',
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'restrict', // 更新时操作
    },
    good_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '买的什么东西',
      references: { // 外键关联
        model: 'goods',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'restrict', // 更新时操作
    },
    price: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '价格',
    },
    status: {
      type: ENUM,
      values: [ 'pending', 'success', 'fail' ],
      allowNull: false,
      defaultValue: 'pending',
      comment: '支付状态',
    },
    goods_num: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '商品数量',
    },
    goodcover: {
      type: STRING,
      allowNull: false,
      defaultValue: '',
      comment: '商品图片',
    },
    total_price: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '商品总价',
    },
    created_time: DATE,
    updated_time: DATE,
  });

  // 关联关系
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  OrderUser.associate = function() {
    // 关联用户
    OrderUser.belongsTo(app.model.User);
    OrderUser.belongsTo(app.model.Goods);
  };

  return OrderUser;
};
