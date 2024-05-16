import { IsString, IsEmail, IsNotEmpty, Matches, IsNumber, IsInt, Min, Max } from 'class-validator';
import { Express } from 'express';

export class User1Dto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^.*[0-9].*$/, { message: 'Password must contain at least one numeric character' })
  password: string;

  @Matches(/^018-\d{7}$/, { message: 'Invalid phone number format. It should be like 018-1234567' })
  phoneNumber: string;

  @IsNumber()
  //@IsInt()
  @Min(1000000000, { message: 'NID number should be 10 digits' })
  @Max(9999999999, { message: 'NID number should be 10 digits' })
  nidNumber: number;

  //@IsNotEmpty()
  validateNIDImageSize(nidImage: Express.Multer.File) {
    const maxSize = 2 * 1024 * 1024 *1024; // 2 MB
    if (!nidImage) {
      return false;
    }
    return nidImage.size <= maxSize;
  }
}
