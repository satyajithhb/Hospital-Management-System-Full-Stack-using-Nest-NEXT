import { IsNotEmpty, IsString} from "class-validator";

export class PrescriptionDto {
    @IsString()
    @IsNotEmpty()
    prescription_text: string;
  }
  