import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
