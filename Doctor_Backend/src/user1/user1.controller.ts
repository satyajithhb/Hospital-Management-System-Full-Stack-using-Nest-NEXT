import { Controller, Post, Body, ValidationPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user1.service';
import { User1Dto } from './dto/user1.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('nidImage')) // Assuming 'nidImage' is the field name for NID image upload
  async registerUser(@Body(new ValidationPipe()) user1Dto: User1Dto, @UploadedFile() nidImage: Express.Multer.File) {
    return this.userService.registerUser(user1Dto, nidImage);
  }
}