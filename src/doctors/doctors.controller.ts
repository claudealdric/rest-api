import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAppointmentDto } from './create-appointment.dto';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  getDoctors() {
    return this.doctorsService.getDoctors();
  }

  @Post('/appointments')
  createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.doctorsService.createAppointment(dto);
  }
}
