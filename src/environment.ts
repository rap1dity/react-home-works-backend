import { config, parse } from 'dotenv';
import * as env from 'env-var';
import { readFileSync } from 'fs';
import { join } from 'node:path';

config();

const loadEnv = process.env.NODE_ENV === 'test' ? parse(readFileSync(join(__dirname, '..', '.jest', '.env.test'))) : {};
Object.assign(process.env, loadEnv);

export const environment = {
  app: {
    port: env.get('PORT').required().default('3000').asPortNumber(),
  },
  tokenKeys: {
    accessKey: env.get('ACCESS_TOKEN_KEY').required().asString(),
    accessTokenExpiresIn: env.get('ACCESS_TOKEN_EXPIRES_IN').required().asInt(),
    refreshKey: env.get('REFRESH_TOKEN_KEY').required().asString(),
    refreshTokenExpiresIn: env.get('REFRESH_TOKEN_EXPIRES_IN').required().asInt(),
  },
  redis: {
    host: env.get('REDIS_HOST').required().default('localhost').asString(),
    port: env.get('REDIS_PORT').required().default('6739').asPortNumber(),
    password: env.get('REDIS_PASSWORD') ? env.get('REDIS_PASSWORD').asString() : undefined,
  },
  database: {
    host: env.get('DB_HOST').required().default('localhost').asString(),
    port: env.get('DB_PORT').required().default('3000').asPortNumber(),
    name: env.get('DB_DATABASE').required().asString(),
    username: env.get('DB_USERNAME').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
  },
};
