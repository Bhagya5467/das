import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GENDER } from '../../common/enum';

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
}
