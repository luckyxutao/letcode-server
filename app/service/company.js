'use strict';

const Service = require('egg').Service;
class CompanyService extends Service {
  async getAll() {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const results = await this.app.mysql.select('company', {
      columns: [ 'id', 'name' ],
    });
    return results;
  }

  async addCompany(name) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const results = await this.app.mysql.insert('company', { name });
    return results;
  }
}
module.exports = CompanyService;
