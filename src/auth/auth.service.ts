import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterAdminDto } from './dtos/registerAdmin.dto';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dtos/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
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
    const hashedPassword = await this.hashPassword(password);
    const newAdmin = this.userRepository.create({
      email,
      gender,
      name,
      address,
      password: hashedPassword,
    });

    return this.userRepository.save(newAdmin);
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
