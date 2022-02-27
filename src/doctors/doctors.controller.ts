import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('/appointments')
  getAppointments(
    @Query('doctorId', ParseIntPipe) doctorId: number,
    @Query('date') date: string,
  ) {
    return this.doctorsService.getAppointmentsForDoctorId(doctorId, date);
  }

  @Delete('/appointments/:id')
  deleteAppointment(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.deleteAppointment(id);
  }
}
