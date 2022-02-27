import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentKind } from './appointment-kind.entity';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @Column()
  doctorId: number;

  @Column()
  patientId: number;

  @Column({ default: 1 })
  appointmentKindId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(
    () => AppointmentKind,
    (appointmentKind) => appointmentKind.appointments,
    { eager: true },
  )
  @JoinColumn({ name: 'appointmentKindId' })
  appointmentKind: AppointmentKind;
}
