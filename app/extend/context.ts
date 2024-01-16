interface options {
  order?: any[]
}
import crypto from 'crypto';
module.exports = {
  // 成功提示
  apiSuccess(data = '', msg = '操作成功', code = 200) {
    this.body = { msg, result: data };
    this.status = code;
  },
  // 失败提示
  apiFail(data = '', msg = '操作失败', code = 400) {
    this.body = { msg, data };
    this.status = code;
  },
  // 分页
  async page(modelName, where = {}, options: options = {}) {
    const page = this.query.page ? parseInt(this.query.page) : 1;
    const limit = this.query.limit ? parseInt(this.query.limit) : 10;
    const offset = (page - 1) * limit;
    if (!options?.order) {
      options.order = [
        [ 'id', 'DESC' ],
      ];
    }

    const res = await this.app.model[modelName].findAndCountAll({
      attributes: { exclude: [ 'password' ] },
      where,
      offset,
      limit,
      ...options,
    });

    // 总页数
    // let totalPage = Math.ceil(res.count/limit)

    // let query = { ...this.query }
    // if (query.hasOwnProperty('page')) {
    //     delete query.page
    // }
    // if (query.hasOwnProperty('limit')) {
    //     delete query.limit
    // }

    return res;
  },

  // 删除提示
  //   toast(msg, type = 'danger') {
  //     this.cookies.set('toast', JSON.stringify({
  //       msg, type,
  //     }), {
  //       maxAge: 1500,
  //       encrypt: true,
  //     });
  //   },

  // 判断移动端还是pc端
  ismobile() {
    const userAgent = this.request.header['user-agent'].toLowerCase();
    const pat_phone = /ipad|iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/;
    return pat_phone.test(userAgent);
  },

  // 用户端生成token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  },

  // 用户端验证token
  checkToken(token) {
    return this.app.jwt.verify(token, this.app.config.jwt.secret);
  },

  // 用户端验证密码
  async checkPassword(password, hash_password) {
    // 先对需要验证的密码进行加密
    const hmac = crypto.createHash('sha256', this.app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest('hex');
    const res = password === hash_password;
    if (!res) {
      this.throw(400, '密码错误');
    }
    return true;
  },

  // 生成唯一key
  randomString(length) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },
};
