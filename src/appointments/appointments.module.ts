import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentController } from './appointments.controller';
import { User } from 'src/users/user.entity';
import { Doctor } from 'src/doctors/doctor.entity';
import { Patient } from 'src/patients/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Doctor, Patient])],
  providers: [AppointmentsService],
  controllers: [AppointmentController],
})
export class AppointmentsModule {}
