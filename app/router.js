'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/project/getTemplate', controller.templates.getTemplate);

  // 相当于 app.io.of('/').router('chat', app.io.controller.chat.index); 被简写了
  app.io.route('chat', app.io.controller.chat.index);

  app.io.of('/chat').route('chat', app.io.controller.chat.index);
};
