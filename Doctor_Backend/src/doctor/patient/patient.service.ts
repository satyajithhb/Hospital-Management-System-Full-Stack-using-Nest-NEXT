import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Patient } from '../entity/patient.entity';
import { PatientDto } from '../dto/paitent.dto';


@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException('Patient with ID  not found');
    }
    return patient;
  }
  

  async create(patientDto: PatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(patientDto);
    return await this.patientRepository.save(patient);
  }

  async update(id: number, patientDto: PatientDto): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new Error('Patient not found');
    }
    this.patientRepository.merge(patient, patientDto);
    return await this.patientRepository.save(patient);
  }

  async remove(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
