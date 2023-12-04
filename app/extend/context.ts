interface options {
  order: any[]
}
module.exports = {
  // 成功提示
  apiSuccess(data = '', code = 200,  msg = '成功',) {
    this.body = { msg, result: data };
    this.status = code;
  },
  // 失败提示
  apiFail(data = '', code = 400,  msg = 'fail',) {
    this.body = { msg, data };
    this.status = code;
  },
  // 分页
  async page(modelName,where = {}, options: options){
    let page = this.query.page ? parseInt(this.query.page) : 1
    let limit = this.query.limit ? parseInt(this.query.limit) : 10
    let offset = (page - 1) * limit

    if(!options.order){
        options.order = [
          ['id','DESC']
        ]
    }

    let res = await this.app.model[modelName].findAndCountAll({
        where,
        offset,
        limit,
        ...options
    })

    // 总页数
    // let totalPage = Math.ceil(res.count/limit)

    // let query = { ...this.query }
    // if (query.hasOwnProperty('page')) {
    //     delete query.page
    // }
    // if (query.hasOwnProperty('limit')) {
    //     delete query.limit
    // }



    return res
},
};
