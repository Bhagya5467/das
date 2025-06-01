import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from 'src/doctors/doctor.entity';
import { Patient } from 'src/patients/patient.entity';
import { APPOINMENT_STATUS } from 'src/common/enum';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @Column({
    type: 'enum',
    enum: APPOINMENT_STATUS,
    default: APPOINMENT_STATUS.PENDING,
  })
  status: APPOINMENT_STATUS;
}
