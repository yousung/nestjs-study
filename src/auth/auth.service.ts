import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import Any = jasmine.Any;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    id: number;
    name: string;
    email: string;
  }> {
    const user = await this.userService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return result;
  }
}
