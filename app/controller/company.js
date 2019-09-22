'use strict';

const Controller = require('egg').Controller;
const resultHandle = require('../util/result');
class CompanyController extends Controller {
  async getAll() {
    const { ctx } = this;
    const tags = await ctx.service.company.getAll();
    ctx.body = resultHandle.getResponse(0, 'ok', tags);
  }
  async addCompany() {
    const { ctx } = this;
    const { companyName } = ctx.request.body;
    if (!companyName) {
      ctx.body = resultHandle.getResponse(1000, 'companyName不能为空');
    }
    await ctx.service.company.addCompany(companyName);
    ctx.body = resultHandle.getResponse(0, 'ok');
  }
}
module.exports = CompanyController;
