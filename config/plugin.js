'use strict';

/** @type Egg.EggPlugin */
// 一定记得删除这个 否则会返回空
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// }
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.io = {
  enable: true,
  package: 'egg-socket.io',
};
