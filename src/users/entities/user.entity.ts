import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique
} from 'typeorm';
import { GENDER } from '../../common/enum';
import { Admin } from './admin.entity';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;

  @Column({ type: 'varchar', nullable: true, default: null })
  address: string;

  @Column({ type: 'varchar', nullable: true, length: 10 })
  phoneNo: string;

  @Column({ type: 'enum', enum: ['doctor', 'patient', 'admin'] })
  role: 'doctor' | 'patient' | 'admin';

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin;

  @OneToOne(() => Patient, (patient) => patient.user)
  patient: Patient;

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  doctor?: Doctor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
