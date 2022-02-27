import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentKind } from './entities/appointment-kind.entity';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from './entities/doctor.entity';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'oregon-postgres.render.com',
      port: 5432,
      username: 'claude',
      password: 'DW6hwmYqKe1qPut89ewWIy8SQxQMzwU3',
      database: 'rest_api',
      entities: [Appointment, AppointmentKind, Doctor, Patient],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    DoctorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
