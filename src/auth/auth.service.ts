import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Admin } from '../users/entities/admin.entity';
import { RegisterAdminDto } from './dtos/registerAdmin.dto';
import { SignInDto } from './dtos/signIn.dto';
import { RegisterPatientDto } from './dtos/registerPatient.dto';
import { Patient } from 'src/users/entities/patient.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerAdmin({
    email,
    gender,
    name,
    password,
    address,
    phoneNo,
  }: RegisterAdminDto) {
    return await this.entityManager.transaction(async (entityManager) => {
      const hashedPassword = await this.hashPassword(password);
      const newUser = entityManager.create(User, {
        email,
        gender,
        name,
        address,
        phoneNo,
        password: hashedPassword,
      });

      await entityManager.save(newUser);

      const newAdmin = entityManager.create(Admin, {
        user: newUser,
      });

      await entityManager.save(newAdmin);

      delete newUser.password;

      return newUser;
    });
  }

  async registerPatient({
    email,
    gender,
    name,
    password,
    address,
    phoneNo,
    age,
  }: RegisterPatientDto) {
    return await this.entityManager.transaction(async (entityManager) => {
      const hashedPassword = await this.hashPassword(password);
      const newUser = entityManager.create(User, {
        email,
        gender,
        name,
        address,
        phoneNo,
        password: hashedPassword,
      });

      await entityManager.save(newUser);

      const newPatient = entityManager.create(Patient, {
        age,
        user: newUser,
      });

      await entityManager.save(newPatient);

      delete newUser.password;

      return newUser;
    });
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { patient: true, admin: true },
    });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    delete user.password;

    const payload = { sub: user.id, username: user.email };

    return {
      ...user,
      accessToken: await this.jwtService.signAsync(payload, {
        secret: 'Enter-your-secret-key-here',
        expiresIn: '1h',
      }),
    };
  }

  private async hashPassword(password: string) {
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
