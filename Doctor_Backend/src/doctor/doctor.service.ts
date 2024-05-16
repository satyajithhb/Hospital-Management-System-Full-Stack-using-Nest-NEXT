import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entity/doctor.entity';
import { RegistrationDto, LoginDto, updateDoctorDto } from './dto/doctor.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Appointment } from './entity/appointment.entity';
import { Patient } from './entity/patient.entity';
import { Prescription } from './entity/prescription.entity';


@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    private mailerService: MailerService,
  ) {}

  async addDoctor(myobj: RegistrationDto): Promise<RegistrationDto> {
    await this.mailerService.sendMail({
      to: myobj.doc_email,
      subject: 'Account creation confirmation',
      text: 'Registration successful.',
    });
    return await this.doctorRepository.save(myobj);
}

async findDoctors(): Promise<Doctor[]> {
  return await this.doctorRepository.find();
}

async findOne( logindata:LoginDto): Promise<any> {
  return await this.doctorRepository.findOneBy({doc_email:logindata.doc_email});
}


  async findDoctorByEmail(email: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { doc_email: email } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async findDoctorById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async updatePassword(usermail: string, newPasswordHash: string): Promise<void> {
    const user = await this.findDoctorByEmail(usermail);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    user.password = newPasswordHash;
    await this.doctorRepository.save(user);
  }

  async updateDoctor(doctor: Doctor): Promise<Doctor> {
    return await this.doctorRepository.save(doctor);
  }

  async updateDoctorProfile(userEmail: string, updateDoctorDto: updateDoctorDto) {
    const doctor = await this.findDoctorByEmail(userEmail);
  
    if (!doctor) {
      throw new NotFoundException(`Doctor with email ${userEmail} not found.`);
    }
  
    doctor.doc_name = updateDoctorDto.doc_name;
    doctor.doc_address = updateDoctorDto.doc_address;
    doctor.doc_email = updateDoctorDto.doc_email;
    doctor.doc_phone = updateDoctorDto.doc_phone;
    doctor.BDMC_certificate_no = updateDoctorDto.BDMC_certificate_no;
    doctor.NID_no = updateDoctorDto.NID_no;
    doctor.Degree = updateDoctorDto.Degree;
    doctor.Specialism = updateDoctorDto.Specialism;
    doctor.Visiting_fee = updateDoctorDto.Visiting_fee;
    doctor.daily_appointment_time = updateDoctorDto.daily_appointment_time;
  
    return this.doctorRepository.save(doctor);
  }

  
  async findDoctorAppointments(email: string): Promise<{ appointments: Appointment[], patients: Patient[] }> {
    const doctor = await this.findDoctorByEmail(email);
    
    const appointments = await this.appointmentRepository.find({ 
      where: { doctor }, 
      relations: ['patient'] // Load the associated patient entity
    });
  
    if (!appointments || appointments.length === 0) {
      throw new NotFoundException('No appointments found for this doctor');
    }
  
    const patients = appointments.map(appointment => appointment.patient);
  
    return { appointments, patients };
  }

  // async findDoctorAppoint(email: string): Promise<Appointment[]> {
  //   const doctor = await this.findDoctorByEmail(email);
  //   return this.appointmentRepository.find({ where: { doctor } });
  // }
  
  
  
  
  

  async findDoctorAppointmentDetails(email: string, appointmentId: number): Promise<{ appointment: Appointment, patient: Patient }> {
    const doctor = await this.findDoctorByEmail(email);
    
    const appointment = await this.appointmentRepository.findOne({ 
      where: { id: appointmentId, doctor }, 
      relations: ['patient'] // Load the associated patient entity
    });
  
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
  
    const patient = appointment.patient;
  
    return { appointment, patient };
  }

  async prescribeMedicine(appointmentId: number, medicine: string): Promise<Prescription> {
    const appointment = await this.appointmentRepository.findOne({ 
      where: { id: appointmentId }, 
      relations: ['patient'] 
    });
  
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
  
    if (appointment.prescription) {
      throw new BadRequestException('Prescription already exists for this appointment');
    }
  
    const prescription = new Prescription();
    prescription.prescription_text = medicine; // Assign medicine to prescription_text
    prescription.appointment = appointment;
  
    return await this.prescriptionRepository.save(prescription);
  }
  

  async getDoctorPrescriptions(email: string): Promise<Prescription[]> {
    const doctor = await this.doctorRepository.findOne({ where: { doc_email: email } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return this.prescriptionRepository.find({ where: { appointment: { doctor } }, relations: ['appointment'] });
  }


  async getDoctorTotalEarnings(email: string): Promise<number> {
    const doctor = await this.doctorRepository.findOne({ where: { doc_email: email } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const prescriptions = await this.getDoctorPrescriptions(email);
    const numberOfPrescriptions = prescriptions.length;
    const totalEarnings = numberOfPrescriptions * doctor.Visiting_fee;
    return Number(totalEarnings); // Convert the result to a number
  }


  async referAppointmentToDoctor(appointmentId: number, newDoctorId: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({where: {id:appointmentId}});
    
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const newDoctor = await this.doctorRepository.findOne({where: {id:newDoctorId}});
    
    if (!newDoctor) {
      throw new NotFoundException('New doctor not found');
    }

    appointment.doctor = newDoctor;

    return await this.appointmentRepository.save(appointment);
  }

}
