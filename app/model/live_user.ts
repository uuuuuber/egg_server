import { Application } from 'typings/app';

module.exports = (app: Application) => {
  const { INTEGER, DATE } = app.Sequelize;

  const LiveUser = app.model.define('live_user', {
    id: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: INTEGER(20),
      primaryKey: true,
      autoIncrement: true,
    },
    live_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '直播间id',
      references: {
        model: 'live',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'restrict', // 更新时操作
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '用户id',
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'restrict', // 更新时操作
    },
    created_time: DATE,
    updated_time: DATE,
  });

  // 关联关系
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LiveUser.associate = function() {
    // 关联用户
    LiveUser.belongsTo(app.model.User);
    // 关联直播间
    LiveUser.belongsTo(app.model.Live);
    // 关联礼物
    // LiveUser.belongsTo(app.model.Gift);
  };

  return LiveUser;
};
