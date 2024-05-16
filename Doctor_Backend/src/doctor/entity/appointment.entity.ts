import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Doctor } from './doctor.entity';
import { Prescription } from './prescription.entity';
import { Patient } from './patient.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointment_date: Date;

  @Column({ nullable: true })
  reason: string;

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments)
  patient: Patient;

  @OneToOne(() => Prescription, prescription => prescription.appointment, { nullable: true })
  @JoinColumn()
  prescription: Prescription;
}
