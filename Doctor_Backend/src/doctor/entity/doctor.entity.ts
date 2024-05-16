import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doc_name: string;

  @Column()
  doc_address: string;

  @Column({ unique: true })
  doc_email: string;

  @Column()
  doc_phone: string;

  @Column()
  BDMC_certificate_no: string;

  @Column()
  NID_no: string;

  @Column()
  Degree: string;

  @Column()
  Specialism: string;

  @Column({ nullable: true })
  profile_photo: string;

  @Column()
  Visiting_fee: number;

  @Column()
  daily_appointment_time: string;

  @Column()
  password: string;
  
  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

}
