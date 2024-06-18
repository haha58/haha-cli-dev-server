'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { socket, logger, helper } = ctx;
    const { id } = socket;
    const query = socket.handshake.query;
    try {
      logger.info('query', query);
      socket.emit('id', helper.parseMsg('connect', {
        type: 'connect',
        message: '云构建服务连接成功',
        id,
      }));
      await next();
      console.log('disconnect');
    } catch (error) {
      logger.error('build error', error.message);
    }

  };
};
