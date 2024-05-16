import { IsNotEmpty, IsString } from "class-validator";

export class PatientDto {
    readonly id: number;
    
    @IsString()
    @IsNotEmpty()
    patient_name: string;
  
    @IsString()
    @IsNotEmpty()
    patient_address: string;
  
    @IsString()
    @IsNotEmpty()
    patient_email: string;
  
    @IsString()
    @IsNotEmpty()
    patient_phone: string;
  }
  