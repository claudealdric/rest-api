import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
})
export class DoctorsModule {}
