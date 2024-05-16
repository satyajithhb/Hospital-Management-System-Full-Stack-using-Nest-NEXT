import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { Doctor } from '../entity/doctor.entity';
import { Patient } from '../entity/patient.entity';
import { Appointment } from '../entity/appointment.entity';
import { Prescription } from '../entity/prescription.entity';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor, Patient,Appointment,Prescription]),
    JwtModule.register({
      global: true,
      secret: "3NP_Backend_Doctor",
      signOptions: { expiresIn: '30m' },
    }),
    MailerModule.forRoot({
      transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
      user: 'adstudentmin@gmail.com',
      pass: 'bsqocjypvwwbmaag'
      },
      }
      })
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}
