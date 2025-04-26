import { Module } from '@nestjs/common';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { redisConfig } from '@common/configs/redis.config';
import { RedisService } from '@src/modules/redis/services/redis.service';

@Module({
  imports: [IORedisModule.forRoot(redisConfig)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
