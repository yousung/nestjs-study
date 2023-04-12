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
  async join(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{
    id: number;
    name: string;
    email: string;
  }> {
    const user: User = await this.authService.join(createUserDto);

    const { password: string, ...result } = user;

    return result;
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
