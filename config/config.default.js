/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = { });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653986300673_5883';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'scafflod',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};