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

  @Column({ type: 'int' })
  age: number;

  @OneToOne(() => User, (user) => user.doctor)
  @JoinColumn()
  user: User;
}