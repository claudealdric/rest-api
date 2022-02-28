import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentKind } from './appointment-kind.entity';
import { Doctor } from './doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', name: 'date_time' })
  dateTime: Date;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @Column({ name: 'patient_first_name' })
  patientFirstName: string;

  @Column({ name: 'patient_last_name' })
  patientLastName: string;

  @Column({ default: 1, name: 'appointment_kind_id' })
  appointmentKindId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(
    () => AppointmentKind,
    (appointmentKind) => appointmentKind.appointments,
    { eager: true },
  )
  @JoinColumn({ name: 'appointment_kind_id' })
  appointmentKind: AppointmentKind;
}
