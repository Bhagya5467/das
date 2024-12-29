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

  @Column({ type: 'enum' })
  gender: GENDER;

  @Column({ type: 'varchar' })
  address: string;
}
