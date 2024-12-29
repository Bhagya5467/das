import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { Admin } from '../users/entities/admin.entity';
import { Patient } from '../users/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Patient])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
