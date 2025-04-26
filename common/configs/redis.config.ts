import { RedisModuleOptions } from '@nestjs-modules/ioredis';
import { environment } from '@src/environment';

export const redisConfig: RedisModuleOptions = {
  type: 'single',
  options: {
    host: environment.redis.host,
    port: environment.redis.port,
    password: environment.redis.password,
  },
};
