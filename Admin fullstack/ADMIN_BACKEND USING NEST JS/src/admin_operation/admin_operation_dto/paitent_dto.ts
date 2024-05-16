import { IsEmail, IsString, Matches, Length, MaxLength, IsIn, IsDateString } from 'class-validator';

export class paitent_dto {

  paitentName: string;

  email: string;

  admissionDate:any| null;


  phone: string;

  gender: string;

  status:string

}


export class dischargePaitent_dto
{
  

  @IsIn(["discharge"],{message:"Status must be'discharge'"})
  status:string

  @IsDateString({}, { message: "provide valid date format for dischargeDate" })
  dischargeDate: string


}
