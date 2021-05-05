import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catRepository.save(createCatDto);
  }

  findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  findOne(id: string): Promise<Cat> {
    return this.catRepository.findOne(id);
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const findCat = await this.catRepository.findOne(id);
    if (!findCat) {
      throw new NotFoundException('no cat');
    }

    return this.catRepository.save({
      ...findCat,
      ...updateCatDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.catRepository.delete(id);
  }
}
