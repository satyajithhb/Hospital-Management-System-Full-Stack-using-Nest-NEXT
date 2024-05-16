import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entity/appointment.entity';
import { AppointmentDto } from '../dto/appointment.dto';
import { Doctor } from '../entity/doctor.entity';
import { Patient } from '../entity/patient.entity';


@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    return await this.appointmentRepository.findOne({ where: { id } });
  }

  // async create(appointmentDto: AppointmentDto): Promise<Appointment> {
  //   const appointment = this.appointmentRepository.create(appointmentDto);
  //   return await this.appointmentRepository.save(appointment);
  // }

  async create(appointmentDto: AppointmentDto): Promise<Appointment> {
    const doctor = await this.appointmentRepository.manager.findOne(Doctor, { where: { id: appointmentDto.doctorId } });
    const patient = await this.appointmentRepository.manager.findOne(Patient, { where: { id: appointmentDto.patientId } });
  
    if (!doctor || !patient) {
      throw new Error('Doctor or Patient not found');
    }
  
    const appointment = this.appointmentRepository.create({
      appointment_date: appointmentDto.appointment_date,
      reason: appointmentDto.reason,
      doctor,
      patient,
    });
  
    return await this.appointmentRepository.save(appointment);
  }

  async update(id: number, appointmentDto: AppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    this.appointmentRepository.merge(appointment, appointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}
