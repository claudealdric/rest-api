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
  getAppointments(
    @Query() query: Record<string, string>,
  ): Promise<Appointment[]> {
    const { doctorId, dateTime } = query;
    return this.doctorsService.getAppointments({
      doctorId,
      dateTimeString: dateTime,
    });
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
