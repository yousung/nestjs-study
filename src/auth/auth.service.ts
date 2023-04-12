import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async login(loginDto: LoginDto): Promise<{
    id: number;
    name: string;
    email: string;
  }> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('없는 이메일');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('비밀번호 틀림');
    }

    const { password, ...result } = user;

    return result;
  }

  async join(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(password, salt);

    return this.prismaService.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
  }
}
