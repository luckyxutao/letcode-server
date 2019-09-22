'use strict';

const Service = require('egg').Service;
class QuestionService extends Service {
  // 默认不需要提供构造函数。
  // constructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
  async getTagsByIds(ids) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const results = await this.app.mysql.select('tag', {
      where: { id: ids.split(',') }, // WHERE 条件
    });
    return results;
  }
  async findAll({ questionId, offset = '0', limit = '20' }) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    let limitIdSql = '';
    if (questionId) {
      offset = '0';
      limitIdSql = ` a.id=${questionId} and`;
    }
    const mainQuery = `select a.*, b.id as company_id, b.name as company from question a inner join company b where${limitIdSql} a.company_id= b.id order by id LIMIT ${offset},${limit}`;
    const results = await this.app.mysql.query(mainQuery);
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      element.tags = await this.getTagsByIds(element.tag_id);
    }
    return results;
  }

  async checkCompany(company_id) {
    if (!company_id) {
      return true;
    }
    const queryCompanyCount =
      'select count(id) as count from company where id = ?';
    const [ companyResult ] = await this.app.mysql.query(
      queryCompanyCount,
      company_id
    );
    if (companyResult.count === 1) {
      return true;
    }
    return false;
  }

  async checkTagId(tag_id) {
    if (!tag_id) {
      return false;
    }
    const queryTagCount = 'select count(*) as count from tag where id in (?)';
    const [ companyResult ] = await this.app.mysql.query(queryTagCount, tag_id);
    if (companyResult.count === tag_id.split(',').length) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {*} questionModel
   * {
        question : '',
        answer : '',
        tag_id : '1,2',
        company_id:2
    }
   */
  async addOrUpdate(saveQuestionObj = {}) {
    const {
      answer = '',
      question = '',
      tag_id,
      company_id,
      question_id,
    } = saveQuestionObj;
    if (!question) {
      throw Error('question不能为空');
    }
    const checkCompanyOk = await this.checkCompany(company_id);
    if (!checkCompanyOk) {
      throw Error(`company:${company_id}不存在`);
    }
    const checkTagOk = await this.checkTagId(tag_id);
    if (!checkTagOk) {
      throw Error(`tag_id:${tag_id}不正确`);
    }
    let mainQuery = '';
    if (!question_id) {
      mainQuery = `insert INTO question (question,answer,tag_id,company_id) values('${question}','${answer}','${tag_id}',${company_id})`;
    } else {
      mainQuery = `update question set question='${question}',answer='${answer}',tag_id='${tag_id}',company_id=${company_id} where id=${question_id}`;
    }
    await this.app.mysql.query(mainQuery);
    return true;
  }

  async getPicture(uid) {
    const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, {
      dataType: 'json',
    });
    return result.data;
  }
}
module.exports = QuestionService;
