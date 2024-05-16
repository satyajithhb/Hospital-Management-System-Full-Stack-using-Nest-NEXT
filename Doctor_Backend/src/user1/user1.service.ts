import { Injectable, BadRequestException } from '@nestjs/common';
import { User1Dto } from './dto/user1.dto';

@Injectable()
export class UserService {
  async registerUser(user1Dto: User1Dto, nidImage: Express.Multer.File) {

    if (user1Dto.nidNumber.toString().length !== 10 || user1Dto.nidNumber.toString().charAt(0) === '0') {
      throw new BadRequestException('Invalid NID number format');
    }
    return { message: 'User registered successfully' };
  }
}
