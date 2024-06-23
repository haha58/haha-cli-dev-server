'use strict';

const userHome = require('user-home');
const fse = require('fs-extra');
const path = require('path');
const Git = require('simple-git');
const { SUCCESS, FAILED } = require('../const');

// 主要是云构建任务
class CloudBuildTask {
  constructor(options, ctx) {
    this._ctx = ctx;
    this._logger = ctx.logger;
    this._repo = options.repo; // 仓库地址
    this._branch = options.branch; // 仓库分支
    this._buildCmd = options.buildCmd; // 构建命令
    this._name = options.name; // 项目名称
    this._version = options.version; // 版本号
    this._dir = path.resolve(userHome, '.haha-cli-dev', 'cloudbuild', `${this._name}@${this._version}`); // 缓存目录
    this._sourceCodeDir = path.resolve(this._dir, this._name); // 缓存源码目录
    this._logger.info('_dir', this._dir);
    this._logger.info('_sourceCodeDir', this._sourceCodeDir);
  }

  async prepare() {
    fse.ensureDirSync(this._dir);
    fse.emptyDirSync(this._dir);
    this._git = new Git(this._dir);
    return this.success();
  }

  success(message, data) {
    return this.response(SUCCESS, message, data);
  }

  failed(message, data) {
    return this.response(FAILED, message, data);
  }
  // 对结果进行处理在response定制
  response(code, message, data) {
    return {
      code, message, data,
    };
  }
}
module.exports = CloudBuildTask;
