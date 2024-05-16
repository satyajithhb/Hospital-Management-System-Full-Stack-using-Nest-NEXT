import { IsEmail, IsString, Matches, Length, MaxLength, IsIn, IsDateString, IsNumber } from 'class-validator';

export class doctor_profile_dto {

  doctorName: string;

  email: string;

  phone: string;

 
  gender: string;

  maxCheekUpPaitent:number;

}
