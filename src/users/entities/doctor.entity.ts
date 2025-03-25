import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column()
  qualifications: string;

  @Column()
  slmcRegistrationNumber: string;

  @Column()
  availableDays: string;

  @Column()
  availableTime: string;

  @Column()
  location: string;

  @OneToOne(() => User, (user) => user.doctor)
  @JoinColumn()
  user: User;
}


  