import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_name: string;

  @Column()
  patient_address: string;

  @Column({ unique: true })
  patient_email: string;

  @Column()
  patient_phone: string;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}
