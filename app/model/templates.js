'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Templates = app.model.define('templates', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, comment: '模板id' },
    name: { type: STRING(255), allowNull: false, comment: '名称' },
    npmName: { type: STRING(255), allowNull: false, comment: '模板名称' },
    version: { type: STRING(255), allowNull: false, comment: '模板版本' },
    npmType: { type: STRING(255), allowNull: false, comment: '是否是标准模板' },
    installCommand: { type: STRING(255), allowNull: false, comment: '安装依赖命令' },
    startCommand: { type: STRING(255), allowNull: false, comment: '启动命令' },
    tag: { type: STRING(255), allowNull: false, comment: '标签' },
    ignore: { type: STRING(255), allowNull: false, comment: '忽略的文件' },
  });

  return Templates;
};
