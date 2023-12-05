interface options {
  order?: any[]
}
module.exports = {
  // 成功提示
  apiSuccess(data = '', msg = '成功', code = 200) {
    this.body = { msg, result: data };
    this.status = code;
  },
  // 失败提示
  apiFail(data = '', msg = '失败', code = 400) {
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
  toast(msg, type = 'danger') {
    this.cookies.set('toast', JSON.stringify({
      msg, type,
    }), {
      maxAge: 1500,
      encrypt: true,
    });
  },
};
