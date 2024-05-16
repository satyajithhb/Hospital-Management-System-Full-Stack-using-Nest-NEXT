import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../entity/doctor.entity';
import { RegistrationDto, LoginDto } from '../dto/doctor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(myobj: RegistrationDto): Promise<RegistrationDto> {
    return await this.doctorService.addDoctor(myobj);
}
    
  async signIn(loginData: LoginDto): Promise<{ access_token: string }> {
    const user = await this.doctorService.findOne(loginData);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload = loginData;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async uploadProfilePhoto(usermail: string, filename: string): Promise<Doctor> {
    const doctor = await this.doctorService.findDoctorByEmail(usermail);
    if (!doctor) {
      throw new UnauthorizedException('Doctor not found');
    }
    doctor.profile_photo = filename;
    return await this.doctorService.updateDoctor(doctor);
  }
}
