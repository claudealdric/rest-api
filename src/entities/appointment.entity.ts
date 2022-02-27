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

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @Column()
  doctorId: number;

  @Column({ default: 1 })
  appointmentKindId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(
    () => AppointmentKind,
    (appointmentKind) => appointmentKind.appointments,
  )
  @JoinColumn({ name: 'appointmentKindId' })
  appointmentKind: AppointmentKind;
}
