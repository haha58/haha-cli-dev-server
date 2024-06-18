'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/project/getTemplate', controller.templates.getTemplate);

  // 相当于 app.io.of('/').router('chat', app.io.controller.chat.index); 被简写了
  // app.io.route('build', app.io.controller.build.index);
};
