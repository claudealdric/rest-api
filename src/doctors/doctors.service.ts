import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { Between, Repository } from 'typeorm';
import { CreateAppointmentDto } from './create-appointment.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Doctor) private doctorsRepository: Repository<Doctor>,
  ) {}

  getDoctors(): Promise<Doctor[]> {
    return this.doctorsRepository.find();
  }

  createAppointment(dto: CreateAppointmentDto) {
    const dateTime = new Date(dto.dateTime);

    return this.appointmentsRepository.insert({
      dateTime,
      doctorId: dto.doctorId,
    });
  }

  getAppointmentsForDoctorId(doctorId: number, dateTimeString: string) {
    const startDate = new Date(dateTimeString);
    const endDate = this._add24Hours(startDate);

    return this.appointmentsRepository.find({
      doctorId,
      dateTime: Between(startDate, endDate),
    });
  }

  private _add24Hours(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 24);
    return newDate;
  }

  deleteAppointment(id: number) {
    return this.appointmentsRepository.delete(id);
  }
}
