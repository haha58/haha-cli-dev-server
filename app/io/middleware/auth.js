'use strict';

const REDIS_PREFIX = 'cloudbuild';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx;
    const { id } = socket;
    const { redis } = app;
    const query = socket.handshake.query;
    try {
      logger.info('query', JSON.stringify(query));
      socket.emit(
        'id',
        helper.parseMsg('connect', {
          type: 'connect',
          message: '云构建服务连接成功',
          id,
        })
      );
      let hasTask = await redis.get(`${REDIS_PREFIX}:${id}`);
      if (!hasTask) {
        await redis.set(`${REDIS_PREFIX}:${id}`, JSON.stringify(query));
      }
      hasTask = await redis.get(`${REDIS_PREFIX}:${id}`);
      logger.info('hasTask', hasTask);
      await next();
      console.log('disconnect');
    } catch (error) {
      logger.error('build error', error.message);
    }
  };
};
