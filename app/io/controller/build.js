'use strict';

const REDIS_PREFIX = 'cloudbuild';

const helper = require('../../extend/helper');
const CloudBuildTask = require('../../models/cloudbuild-task');
const { SUCCESS, FAILED } = require('../../const');

async function createCloudBuildTask(ctx, app) {
  const { socket } = ctx;
  const client = socket.id;
  const redisKey = `${REDIS_PREFIX}:${client}`;
  const redisTask = await app.redis.get(redisKey);
  const task = JSON.parse(redisTask);
  socket.emit('build', helper.parseMsg('create task', { message: '创建云任务成功' }));
  return new CloudBuildTask({
    repo: task.repo,
    name: task.name,
    version: task.version,
    branch: task.branch,
    buildCmd: task.buildCmd,
  }, ctx);
}

async function prepare(cloudBuildTask, socket, helper) {
  socket.emit('build', helper.parseMsg('prepare', { message: '开始执行构建前准备工作' }));
  const prepareRes = await cloudBuildTask.prepare();
  console.log('prepareRes', prepareRes);
  if (!prepareRes || prepareRes.code === FAILED) {
    // + prepareRes ? prepareRes?.message : '无'
    socket.emit('build', helper.parseMsg('prepare failed', { message: '执行构建前准备工作失败，失败原因:'  }));
    return;
  }
  socket.emit('build', helper.parseMsg('prepare', { message: '执行构建前准备工作成功' }));
}

module.exports = app => {
  class Controller extends app.Controller {
    async index() {
      const { ctx, app } = this;
      const { socket, helper } = ctx;
      const cloudBuildTask = await createCloudBuildTask(ctx, app); // 创建云构建任务
      try {
        await prepare(cloudBuildTask, socket, helper);
      } catch (error) {
        socket.emit('build', helper.parseMsg('error', { message: '云构建失败，失败原因:' + error.message }));
        socket.disconnect();
      }
    }
  }
  return Controller;
};
