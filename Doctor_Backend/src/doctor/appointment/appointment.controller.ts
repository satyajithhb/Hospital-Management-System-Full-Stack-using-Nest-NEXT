import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from '../dto/appointment.dto';


@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async findAll() {
    return await this.appointmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appointmentService.findOne(+id);
  }

  @Post()
  async create(@Body() appointmentDto: AppointmentDto) {
    return await this.appointmentService.create(appointmentDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() appointmentDto: AppointmentDto) {
    return await this.appointmentService.update(+id, appointmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.appointmentService.remove(+id);
  }
}
