import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Admin } from '../users/entities/admin.entity';
import { RegisterAdminDto } from './dtos/registerAdmin.dto';
import { SignInDto } from './dtos/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerAdmin({
    email,
    gender,
    name,
    password,
    address,
  }: RegisterAdminDto) {
    return await this.entityManager.transaction(async (entityManager) => {
      const hashedPassword = await this.hashPassword(password);
      const newUser = entityManager.create(User, {
        email,
        gender,
        name,
        address,
        password: hashedPassword,
      });

      await entityManager.save(newUser);

      const newAdmin = entityManager.create(Admin, {
        user: newUser,
      });

      await entityManager.save(newAdmin);

      return newUser;
    });
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.userRepository.findOneBy({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }

  private async hashPassword(password: string) {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
