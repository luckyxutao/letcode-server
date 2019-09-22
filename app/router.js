'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/question/search', controller.question.getAll);
  router.post('/question/addOrUpdate', controller.question.addOrUpdate);
  router.get('/tag/getAll', controller.tag.getAll);
  router.post('/tag/add', controller.tag.addTag);
  router.get('/company/getAll', controller.company.getAll);
  router.post('/company/add', controller.company.addCompany);
  router.get('/', controller.home.index);
};
