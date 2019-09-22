'use strict';

const Service = require('egg').Service;
class TagService extends Service {
  async getAllTags() {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const results = await this.app.mysql.select('tag', {
      columns: [ 'id', 'name' ],
    });
    return results;
  }

  async addTag(name) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const results = await this.app.mysql.insert('tag', { name });
    return results;
  }
}
module.exports = TagService;
