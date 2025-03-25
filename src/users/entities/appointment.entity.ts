import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  patient: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.id)
  doctor: Doctor;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ default: 'pending' })
  status: string;
}
