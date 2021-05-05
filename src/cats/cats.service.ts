import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Cat {
    const cat = { ...createCatDto, id: uuidv4() };
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: string): Cat {
    const findIdx = this.findCatIndex(id);

    return this.cats[findIdx];
  }

  update(id: string, updateCatDto: UpdateCatDto): Cat {
    const findIndex = this.findCatIndex(id);

    this.cats[findIndex] = {
      ...this.cats[findIndex],
      ...updateCatDto,
    };

    return this.cats[findIndex];
  }

  remove(id: string): void {
    this.cats = this.cats.filter((cat) => cat.id !== id);
  }

  private findCatIndex(id: string, message = 'no cat'): number {
    const findIdx = this.cats.findIndex((cat) => cat.id === id);

    if (findIdx === -1) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    return findIdx;
  }
}
