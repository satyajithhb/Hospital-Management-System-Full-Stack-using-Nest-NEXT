import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirstUserService } from './firstUser.service';
import { FirstUserController } from './firstUser.controller';
import { Fuser } from './firstUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fuser])],
  controllers: [FirstUserController],
  providers: [FirstUserService],
})
export class FirstUserModule {}
