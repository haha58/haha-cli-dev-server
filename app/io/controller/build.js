'use strict';

const REDIS_PREFIX = 'cloudbuild';

const helper = require('../../extend/helper');
const CloudBuildTask = require('../../models/cloudbuild-task');

async function createCloudBuildTask(ctx, app) {
  const { socket } = ctx;
  const client = socket.id;
  const redisKey = `${REDIS_PREFIX}:${client}`;
  const redisTask = await app.redis.get(redisKey);
  const task = JSON.parse(redisTask);
  socket.emit('build', helper.parseMsg('create task', { message: '创建云任务成功' }));
  console.log('res', redisTask);
  return new CloudBuildTask({
    repo: task.repo,
    name: task.name,
    version: task.version,
    branch: task.branch,
    buildCmd: task.buildCmd,
  }, ctx);
}

module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const { ctx, app } = this;
      const cloudBuildTask = await createCloudBuildTask(ctx, app); // 创建云构建任务
      console.log('cloudBuildTask', cloudBuildTask);
    }
  }
  return Controller;
};
