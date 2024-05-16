import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prescription_text: string;

  @OneToOne(() => Appointment, appointment => appointment.prescription)
  @JoinColumn()
  appointment: Appointment;
}
