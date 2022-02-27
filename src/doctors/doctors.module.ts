import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentKind } from 'src/entities/appointment-kind.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { Patient } from 'src/entities/patient.entity';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, AppointmentKind, Doctor, Patient]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
