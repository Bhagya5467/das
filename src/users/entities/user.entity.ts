import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GENDER } from '../../common/enum';
import { Admin } from './admin.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: GENDER })
  gender: GENDER;

  @Column({ type: 'varchar', nullable: true, default: null })
  address: string;

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
