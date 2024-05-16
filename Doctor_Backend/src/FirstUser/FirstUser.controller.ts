import { Controller,Get, Post, Body, Patch, Param } from '@nestjs/common';
import { FirstUserService } from './firstUser.service';
import { UpdateUserStatusDto } from './dto/firstUser.dto';
import { Fuser } from './FirstUser.entity';

@Controller('fuser')
export class FirstUserController {
  constructor(private readonly userService: FirstUserService) {}

  @Post()
async createUser(@Body() createUserDto: Fuser) {
  return this.userService.createUser(createUserDto);}

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }
  
  @Patch('/:id/status')
  async updateUserStatus(@Param('id') id: number, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.userService.changeUserStatus(id, updateUserStatusDto.status);
   }

  @Get('/inactive')
  async findInactiveUsers() {
  return this.userService.findInactiveUsers();
   }

  @Get('/older-than-40')
  async findUsersOlderThan40() {
    return this.userService.findUsersOlderThan40();
  }
}
  