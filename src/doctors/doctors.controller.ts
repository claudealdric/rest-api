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
import { ApiQuery } from '@nestjs/swagger';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { DoctorsService } from './doctors.service';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { GetAppointmentsDto } from './dtos/get-appointments.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  getDoctors(): Promise<Doctor[]> {
    return this.doctorsService.getDoctors();
  }

  @Get('/appointments')
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'dateTime', type: Date, required: true })
  @ApiQuery({ name: 'doctorId', type: Number, required: true })
  getAppointments(@Query() dto: GetAppointmentsDto): Promise<Appointment[]> {
    return this.doctorsService.getAppointments(dto);
  }

  @Post('/appointments')
  createAppointment(@Body() dto: CreateAppointmentDto): Promise<Appointment> {
    return this.doctorsService.createAppointment(dto);
  }

  @Get('/appointments/:id')
  getAppointmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Appointment> {
    return this.doctorsService.getAppointmentById(id);
  }

  @Delete('/appointments/:id')
  deleteAppointment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Appointment> {
    return this.doctorsService.deleteAppointment(id);
  }
}
