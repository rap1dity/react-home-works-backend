import { Module } from '@nestjs/common';
import { UsersControllerV1 } from '@src/modules/users/controllers/users.controller.v1';
import { UsersService } from '@src/modules/users/services/users.service';

@Module({
  controllers: [UsersControllerV1],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
