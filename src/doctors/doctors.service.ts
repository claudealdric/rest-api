import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private doctorsRepository: Repository<Doctor>,
  ) {}

  getDoctors(): Promise<Doctor[]> {
    return this.doctorsRepository.find();
  }
}
