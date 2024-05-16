import { IsEmail, IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  doc_name: string;

  @IsString()
  @IsNotEmpty()
  doc_address: string;

  @IsEmail()
  @IsNotEmpty()
  doc_email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11, {message: 'Phone number must not exit 11 digits'})
  doc_phone: string;

  @IsString()
  @IsNotEmpty()
  BDMC_certificate_no: string;

  @IsString()
  @IsNotEmpty()
  NID_no: string;

  @IsString()
  @IsNotEmpty()
  Degree: string;

  @IsString()
  @IsNotEmpty()
  Specialism: string;

  profile_photo?: string;

  @IsNumber()
  @IsNotEmpty()
  Visiting_fee: number;

  @IsString()
  @IsNotEmpty()
  daily_appointment_time: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    doc_email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  }

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    currentPassword: string;
  
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}

export class updateDoctorDto {
  @IsString()
  @IsNotEmpty()
  doc_name: string;

  @IsString()
  @IsNotEmpty()
  doc_address: string;

  @IsEmail()
  @IsNotEmpty()
  doc_email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(11, {message: 'Phone number must not exit 11 digits'})
  doc_phone: string;

  @IsString()
  @IsNotEmpty()
  BDMC_certificate_no: string;

  @IsString()
  @IsNotEmpty()
  NID_no: string;

  @IsString()
  @IsNotEmpty()
  Degree: string;

  @IsString()
  @IsNotEmpty()
  Specialism: string;

  @IsNumber()
  @IsNotEmpty()
  Visiting_fee: number;

  @IsString()
  @IsNotEmpty()
  daily_appointment_time: string;
}