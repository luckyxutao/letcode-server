'use strict';

const Controller = require('egg').Controller;
const resultHandle = require('../util/result');
class QuestionController extends Controller {
  async getAll() {
    const { ctx } = this;
    const { offset, limit, questionId } = ctx.query;
    const question = await ctx.service.question.findAll({
      offset,
      limit,
      questionId,
    });
    ctx.body = resultHandle.getResponse(0, 'ok', question);
  }

  /**
 *    * {
        question : '',
        answer : '',
        tag_id : '1,2',
        company_id:2
    }
 */
  async addOrUpdate() {
    const { ctx } = this;
    const {
      question,
      answer,
      tag_id,
      company_id,
      question_id,
    } = ctx.request.body;
    try {
      await ctx.service.question.addOrUpdate({
        question,
        answer,
        tag_id,
        company_id,
        question_id,
      });
      ctx.body = resultHandle.getResponse(0, 'ok', null);
    } catch (error) {
      ctx.body = resultHandle.getResponse(1000, error.toString(), null);
    }
  }
}
module.exports = QuestionController;
