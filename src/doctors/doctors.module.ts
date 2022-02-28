import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentKind } from 'src/entities/appointment-kind.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { UtilsService } from 'src/utils/utils.service';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, AppointmentKind, Doctor])],
  controllers: [DoctorsController],
  providers: [DoctorsService, UtilsService],
})
export class DoctorsModule {}
