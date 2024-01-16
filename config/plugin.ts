import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  tegg: {
    enable: true,
    package: '@eggjs/tegg-plugin',
  },
  teggConfig: {
    enable: true,
    package: '@eggjs/tegg-config',
  },
  teggController: {
    enable: true,
    package: '@eggjs/tegg-controller-plugin',
  },
  teggSchedule: {
    enable: true,
    package: '@eggjs/tegg-schedule-plugin',
  },
  eventbusModule: {
    enable: true,
    package: '@eggjs/tegg-eventbus-plugin',
  },
  aopModule: {
    enable: true,
    package: '@eggjs/tegg-aop-plugin',
  },
  tracer: {
    enable: true,
    package: 'egg-tracer',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
  tenpay: {
    enable: true,
    package: 'egg-tenpay',
  },
  // 用户
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },

  io: {
    enable: true,
    package: 'egg-socket.io',
  },
};

export default plugin;
