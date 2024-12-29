import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dtos/registerAdmin.dto';
import { SignInDto } from './dtos/signIn.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiBody({ type: RegisterAdminDto })
  registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return this.authService.registerAdmin(registerAdminDto);
  }

  @Post('/sign-in')
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
