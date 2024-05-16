import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from '../dto/paitent.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientService.findOne(+id);
  }

  @Post('add')
  async create(@Body() patientDto: PatientDto) {
    return await this.patientService.create(patientDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() patientDto: PatientDto) {
    return await this.patientService.update(+id, patientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.patientService.remove(+id);
  }
}
