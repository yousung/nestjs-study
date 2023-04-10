import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

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

    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException('비밀번호 틀림');
    }

    const { password, ...result } = user;

    return result;
  }

  async join(createUserDto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
      },
    });
  }
}
