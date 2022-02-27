import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column()
  doctorId: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;
}
