import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1700456188801_6301';

  // add your egg config in here
  config.middleware = [ 'errorHandler', 'auth' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  // 允许跨域的方法
  config.cors = {
    origin: '*',
    credentials: true, // 允许携带凭据
    allowMethods: 'GET, PUT, POST, DELETE, PATCH',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'tjh246780',
    port: 3306,
    database: 'eCommerce_live_test',
    // 中国时区
    timezone: '+08:00',
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: true,
      // 字段生成软删除时间戳 deleted_at
      // paranoid: true,
      createdAt: 'created_time',
      updatedAt: 'updated_time',
      // deletedAt: 'deleted_time',
      // 所有驼峰命名格式化
      underscored: true,
    },
  };

  // 模板渲染
  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.valparams = {
    locale: 'zh-cn',
    throwError: true,
  };

  config.crypto = {
    secret: 'mimaoXXX@__jk',
  };

  config.session = {
    // 在有些场景下，我们希望用户如果长时间都在访问我们的站点，则延长他们的 Session 有效期，不让用户退出登录态
    renew: true,
    // key 代表了存储 Session 的 Cookie 键值对的 key 是什么
    key: 'user_token',
    // 最长保存时间（毫秒）
    maxAge: 24 * 3600 * 1000 * 1, // 1 天
    // 设置键值对是否可以被 js 访问，默认为 true，不允许被 js 访问。
    httpOnly: true,
    // 加密
    encrypt: true,
  };

  // 权限不验证的路由
  config.auth = {
    ignore: [
      '/admin/login',
      '/admin/loginevent',
    ],
  };

  config.webUrl = 'http://127.0.0.1:7001/';

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
