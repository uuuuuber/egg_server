import { Application } from 'typings/app';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const Order = app.model.define('order', {
    id: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },
    no: {
      type: STRING(100),
      allowNull: false,
      defaultValue: '',
      comment: '订单号',
      unique: true,
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '用户id',
      references: { // 外键关联
        model: 'user',
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
    created_time: DATE,
    updated_time: DATE,
  });

  // 关联关系
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Order.associate = function() {
    // 关联用户
    Order.belongsTo(app.model.User);
  };

  return Order;
};
