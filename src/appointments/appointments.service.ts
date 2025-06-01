import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctors/doctor.entity';
import { CreateDto } from './dtos/create.dto';
import { Patient } from 'src/patients/patient.entity';
import { ConfirmDto } from './dtos/confirm.dto';
import { APPOINMENT_STATUS } from 'src/common/enum';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,

    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,

    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async createAppointment({ date, doctorId, patientId, time }: CreateDto) {
    const patient = await this.patientRepo.findOneBy({ id: patientId });
    const doctor = await this.doctorRepo.findOneBy({ id: doctorId });

    if (!patient) throw new NotFoundException('Patient is not found');
    if (!doctor) throw new NotFoundException('Doctor is not found');

    const appointment = await this.appointmentRepo.save({
      date: new Date(date),
      time,
      doctor,
      patient,
    });

    return appointment;
  }

  async confirmAppointment({ id }: ConfirmDto) {
    const appointment = await this.appointmentRepo.findOneBy({ id });

    if (!appointment) throw new NotFoundException('Appointment is not found');

    appointment.status = APPOINMENT_STATUS.BOOKED;

    await this.appointmentRepo.save(appointment);

    return appointment;
  }
}
