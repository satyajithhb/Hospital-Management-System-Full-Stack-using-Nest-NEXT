import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionDto } from '../dto/prescription.dto';

@Controller('prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Get()
  async findAll() {
    return await this.prescriptionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.prescriptionService.findOne(+id);
  }

  @Post()
  async create(@Body() prescriptionDto: PrescriptionDto) {
    return await this.prescriptionService.create(prescriptionDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() prescriptionDto: PrescriptionDto) {
    return await this.prescriptionService.update(+id, prescriptionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.prescriptionService.remove(+id);
  }
}
