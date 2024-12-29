import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  age: number;

  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn()
  user: User;
}
