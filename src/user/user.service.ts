import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { raw } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const filter = { where: { id } };
    const user = await this.userRepository.findOne(filter);

    if (!user) {
      throw new NotFoundException(
        '변경하려는 회원의 아이디가 존재하지 않습니다.',
      );
    }

    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne(filter);
  }

  deleteUser(id: string) {
    return 'delete user : ' + id;
  }
}
