import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from '@common/configs/typeorm.config';
import { UsersModule } from '@src/modules/users/users.module';
import { AuthModule } from '@src/modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeormConfig }), UsersModule, AuthModule],
})
export class AppModule {}
