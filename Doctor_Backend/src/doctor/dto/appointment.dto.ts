import { IsNotEmpty, IsString } from "class-validator";

export class AppointmentDto {
    @IsString()
    @IsNotEmpty()
    appointment_date: Date;

    @IsString()
    reason?: string;

    @IsNotEmpty()
    doctorId: number;
    @IsNotEmpty()
    patientId: number;

    prescriptionId?: number;
  }
  