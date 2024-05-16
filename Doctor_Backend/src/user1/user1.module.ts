import { Module } from '@nestjs/common';
import { UserController } from './user1.controller';
import { UserService } from './user1.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
