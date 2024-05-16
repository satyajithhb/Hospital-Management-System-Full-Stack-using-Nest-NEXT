import { Body, Controller, Get, Res, Post, UsePipes, UseInterceptors, UploadedFile, ValidationPipe, UseGuards, UnauthorizedException, Req, Patch, Param, HttpStatus,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DoctorService } from '../doctor.service';
import { RegistrationDto, LoginDto, UpdatePasswordDto } from '../dto/doctor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './auth.guard';
import path, { join } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private doctorService:DoctorService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async addUser(@Body() myobj: RegistrationDto): Promise<RegistrationDto> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(myobj.password, salt);
    myobj.password = hashedPassword;
    return this.authService.signUp(myobj);
  }  

  @Post('login')
  async signIn(@Body() loginData: LoginDto) {
    return this.authService.signIn(loginData);
  }


  @Post('upload-profile-photo')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('profile_photo', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 3000000 },
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
      },
    }),
  }))

  async uploadProfilePhoto(@UploadedFile() file: Express.Multer.File, @Req() req): Promise<{ profile_photo: string }> {
    const usermail = req.user.doc_email;
    if (!usermail) {
      throw new UnauthorizedException('User not found');
    }
    const updatedUser = await this.authService.uploadProfilePhoto(usermail, file.filename);
    return { profile_photo: updatedUser.profile_photo };
  }

  @Get('profile_photo')
  @UseGuards(AuthGuard)
  async getProfilePhoto(@Res() res, @Req() req) {
    const usermail = req.user.doc_email;
    const user = await this.doctorService.findDoctorByEmail(usermail);

    if (!user || !user.profile_photo) {
      return res.status(404).send('Profile photo not found');
    }

    const filePath = join(process.cwd(), 'uploads', user.profile_photo);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error serving profile photo:', err);
        res.status(404).send('Profile photo not found');
      }
    });
  }  

  @Get('photo/:profile_photo')
  getImages(@Param('profile_photo') profile_photo: string, @Res() res) {
    res.sendFile(profile_photo, { root: './uploads' })
  }

  @Patch('update-password')
  @UseGuards(AuthGuard)
  async updatePassword(@Req() req, @Body() updatePasswordDto: UpdatePasswordDto) {   
      const usermail = req.user.doc_email;
      const user = await this.doctorService.findDoctorByEmail(usermail);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

    const isMatch = await bcrypt.compare(updatePasswordDto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect current password');
    }

    const newPasswordHash = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    await this.doctorService.updatePassword(usermail, newPasswordHash);

    return { message: 'Password updated successfully' };
  } 
  catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}

