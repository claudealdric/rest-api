import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createAppointment(dto: CreateAppointmentDto): Promise<Appointment> {
    const appointmentDateTime = this._getAppointmentDateTime(dto.dateTime);

    if (!this._isValidDateTime(appointmentDateTime)) {
      throw new BadRequestException('Invalid date/time format');
    }

    if (!this._isIn15MinuteInterval(appointmentDateTime)) {
      throw new BadRequestException(
        'Appointments can only start at 15-minute intervals',
      );
    }

    if (await this._hasTooManyAppointments(dto.doctorId, appointmentDateTime)) {
      throw new BadRequestException(
        'There are too many appointments for the given date/time',
      );
    }

    const newAppointment = this.appointmentsRepository.create({
      ...dto,
      dateTime: appointmentDateTime,
    });
    return this.appointmentsRepository.save(newAppointment);
  }

  private _getAppointmentDateTime(dateTimeString: string): Date {
    const appointmentDateTime = new Date(dateTimeString);
    appointmentDateTime.setSeconds(0);
    appointmentDateTime.setMilliseconds(0);
    return appointmentDateTime;
  }

  private _isValidDateTime(dateTime: Date): boolean {
    return !isNaN(dateTime.valueOf());
  }

  private _isIn15MinuteInterval(dateTime: Date): boolean {
    return dateTime.getMinutes() % 15 === 0;
  }

  private async _hasTooManyAppointments(
    doctorId: number,
    dateTime: Date,
  ): Promise<boolean> {
    const threshold = 3;
    const appointmentsCount = await this.appointmentsRepository.count({
      doctorId,
      dateTime,
    });
    return appointmentsCount >= threshold;
  }

  getAppointmentsForDoctorId(
    doctorId: number,
    dateTimeString: string,
  ): Promise<Appointment[]> {
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

  async deleteAppointment(id: number): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne(id);

    if (!appointment) {
      throw new NotFoundException('Appointment ID not found');
    }

    return this.appointmentsRepository.remove(appointment);
  }
}
