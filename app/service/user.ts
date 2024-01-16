'use strict';

import { Service } from 'egg';

class UserService extends Service {
  // 用户是否存在
  async exist(id) {
    const { app } = this;

    return await app.model.User.findOne({
      where: {
        id,
      },
    });
  }
}

module.exports = UserService;
