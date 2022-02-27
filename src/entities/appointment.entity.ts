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

  @Column({ type: 'timestamptz', name: 'date_time' })
  dateTime: Date;

  @Column({ name: 'doctor_id' })
  doctorId: number;

  @Column({ name: 'patient_id' })
  patientId: number;

  @Column({ default: 1, name: 'appointment_kind_id' })
  appointmentKindId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(
    () => AppointmentKind,
    (appointmentKind) => appointmentKind.appointments,
    { eager: true },
  )
  @JoinColumn({ name: 'appointment_kind_id' })
  appointmentKind: AppointmentKind;
}
