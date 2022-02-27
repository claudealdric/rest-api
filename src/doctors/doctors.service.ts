import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { UtilsService } from 'src/utils/utils.service';
import { Between, Repository } from 'typeorm';
import { CreateAppointmentDto } from './create-appointment.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Doctor) private doctorsRepository: Repository<Doctor>,
    private readonly utilsService: UtilsService,
  ) {}

  getDoctors(): Promise<Doctor[]> {
    return this.doctorsRepository.find();
  }

  getAppointments({
    doctorId,
    dateTimeString,
  }: {
    doctorId: string;
    dateTimeString: string;
  }): Promise<Appointment[]> {
    if (!doctorId) {
      throw new BadRequestException(
        'Required query parameter missing: doctorId',
      );
    }

    if (isNaN(Number(doctorId))) {
      throw new BadRequestException('Doctor ID must be a number');
    }

    if (!dateTimeString) {
      throw new BadRequestException(
        'Required query parameter missing: dateTime',
      );
    }

    const startDate = new Date(dateTimeString);

    if (!this.utilsService.isValidDateTime(startDate)) {
      throw new BadRequestException('Invalid date/time format');
    }

    const endDate = this.utilsService.add24Hours(startDate);

    return this.appointmentsRepository.find({
      doctorId: Number(doctorId),
      dateTime: Between(startDate, endDate),
    });
  }

  async createAppointment(dto: CreateAppointmentDto): Promise<Appointment> {
    const appointmentDateTime = this._getAppointmentDateTime(dto.dateTime);

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

  async deleteAppointment(id: number): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne(id);

    if (!appointment) {
      throw new NotFoundException('Appointment ID not found');
    }

    return this.appointmentsRepository.remove(appointment);
  }
}
