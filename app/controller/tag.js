'use strict';

const Controller = require('egg').Controller;
const resultHandle = require('../util/result');
class TagController extends Controller {
  async getAll() {
    const { ctx } = this;
    const tags = await ctx.service.tag.getAllTags();
    ctx.body = resultHandle.getResponse(0, 'ok', tags);
  }
  async addTag() {
    const { ctx } = this;
    const { tagName } = ctx.request.body;
    if (!tagName) {
      ctx.body = resultHandle.getResponse(1000, 'tagName不能为空');
    }
    await ctx.service.tag.addTag(tagName);
    ctx.body = resultHandle.getResponse(0, 'ok');
  }
}
module.exports = TagController;
