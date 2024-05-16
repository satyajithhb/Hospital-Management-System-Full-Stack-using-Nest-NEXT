import { Controller, Get, Param, Req, UseGuards,Post,Body, NotFoundException, ParseIntPipe, Patch } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './entity/doctor.entity';
import { AuthGuard } from './auth/auth.guard';
import { updateDoctorDto } from './dto/doctor.dto';
import { Appointment } from './entity/appointment.entity';
import { Patient } from './entity/patient.entity';
import { Prescription } from './entity/prescription.entity';

@Controller('doctor')
export class DoctorController {
  doctorRepository: any;
  constructor(
    private readonly doctorService: DoctorService,
  ) {}

  @Get()
  async getAllDoctors(): Promise<Doctor[]> {
    return await this.doctorService.findDoctors();
  }

  @Get('myprofile')
  @UseGuards(AuthGuard)
  async getUserProfile(@Req() req) {
    const usermail = req.user.doc_email;
    const userProfile = await this.doctorService.findDoctorByEmail(usermail);
    return userProfile;
  }

  @Get('earnings')
  @UseGuards(AuthGuard)
  async getDoctorTotalEarnings(@Req() req): Promise<number> {
    const userEmail = req.user.doc_email;
    return this.doctorService.getDoctorTotalEarnings(userEmail);
  }

@Get('my_appointments')
@UseGuards(AuthGuard)
async getDoctorAppointments(@Req() req): Promise<{ appointments: Appointment[], patients: Patient[] }> {
  const usermail = req.user.doc_email;
  return this.doctorService.findDoctorAppointments(usermail);
}

@Get('prescriptions')
@UseGuards(AuthGuard)
async getDoctorPrescriptions(@Req() req): Promise<Prescription[]> {
    const userEmail = req.user.doc_email;
    return this.doctorService.getDoctorPrescriptions(userEmail);
}

@Post('prescribe/:id')
@UseGuards(AuthGuard)
async prescribeMedicine(@Req() req,@Param('id', ParseIntPipe) id: number,@Body('medicine') medicine: string): Promise<Prescription> {
  const usermail = req.user.doc_email;
  return this.doctorService.prescribeMedicine(id, medicine);
}


  // @Get('/allappointments')
  // @UseGuards(AuthGuard) // Assuming you have an authentication guard
  // async getDoctorAppointments(@Req() req): Promise<Appointment[]> {
  //   const userEmail = req.user.doc_email; // Assuming you store the logged-in user's email in req.user
  //   console.log(userEmail);
  //   return this.doctorService.findDoctorAppoint(userEmail);
  // }

  @Get(':id')
  async getDoctorById(@Param('id',ParseIntPipe) id: number): Promise<Doctor> {
    return await this.doctorService.findDoctorById(id);
  }

  @Get('email/:email')
  async searchDoctorByEmail(@Param('email') email: string): Promise<Doctor> {
    return await this.doctorService.findDoctorByEmail(email);
  }

  @Patch('update_profile')
  @UseGuards(AuthGuard)
  async updateDoctorProfile(@Req() req, @Body() updateDoctorDto: updateDoctorDto) {
   const userEmail = req.user.doc_email;
   return this.doctorService.updateDoctorProfile(userEmail, updateDoctorDto);
 }


 @Get('my_appointments/:id')
 @UseGuards(AuthGuard)
 async getDoctorAppointmentDetails(@Req() req, @Param('id', ParseIntPipe) id: number): Promise<{ appointment: Appointment, patient: Patient }> {
   const usermail = req.user.doc_email;
   return this.doctorService.findDoctorAppointmentDetails(usermail, id);
 }

 @Patch('refer_appointment/:appointmentId/:newDoctorId')
  @UseGuards(AuthGuard)
  async referAppointmentToDoctor(@Param('appointmentId', ParseIntPipe) appointmentId: number,
  @Param('newDoctorId', ParseIntPipe) newDoctorId: number,): Promise<Appointment> {
    return this.doctorService.referAppointmentToDoctor(appointmentId, newDoctorId);
  }
 

}

