import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('join')
  join(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.authService.join(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{
    id: number;
    name: string;
    email: string;
  }> {
    return this.authService.login(loginDto);
  }
}
