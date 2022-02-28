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
import { CreateAppointmentDto } from './create-appointment.dto';
import { DoctorsService } from './doctors.service';

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
  @ApiQuery({ name: 'dateTime', type: Date })
  @ApiQuery({ name: 'doctorId', type: Number })
  getAppointments(
    @Query() query: Record<string, string>,
  ): Promise<Appointment[]> {
    return this.doctorsService.getAppointments(query);
  }

  @Post('/appointments')
  createAppointment(@Body() dto: CreateAppointmentDto): Promise<Appointment> {
    return this.doctorsService.createAppointment(dto);
  }

  @Delete('/appointments/:id')
  deleteAppointment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Appointment> {
    return this.doctorsService.deleteAppointment(id);
  }
}
