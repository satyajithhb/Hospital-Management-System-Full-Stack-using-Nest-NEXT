import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from '../entity/prescription.entity';
import { PrescriptionDto } from '../dto/prescription.dto';


@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
  ) {}

  async findAll(): Promise<Prescription[]> {
    return await this.prescriptionRepository.find();
  }

  async findOne(id: number): Promise<Prescription> {
    return await this.prescriptionRepository.findOne({ where: { id } });
  }

  async create(prescriptionDto: PrescriptionDto): Promise<Prescription> {
    const prescription = this.prescriptionRepository.create(prescriptionDto);
    return await this.prescriptionRepository.save(prescription);
  }

  async update(id: number, prescriptionDto: PrescriptionDto): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.findOne({ where: { id } });
    if (!prescription) {
      throw new Error('Prescription not found');
    }
    this.prescriptionRepository.merge(prescription, prescriptionDto);
    return await this.prescriptionRepository.save(prescription);
  }

  async remove(id: number): Promise<void> {
    await this.prescriptionRepository.delete(id);
  }
}
