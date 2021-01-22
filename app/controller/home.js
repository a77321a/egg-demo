'use strict';

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const query = ctx.query;
    const data = await this.service.htmlService.getHtml(query.url);
    ctx.body = {
      code: 200,
      data,
    };
  }
}

module.exports = HomeController;
