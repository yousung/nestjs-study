import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
// import { Board, BoardStatus } from './board.model';
import { PrismaService } from '../prisma.service';
import { Board, Prisma } from '@prisma/client';
import { BoardStatus } from './board.model';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBoards(): Promise<Board[]> {
    return this.prisma.board.findMany({});
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board: Prisma.BoardCreateInput = {
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
    };

    return this.prisma.board.create({ data: board });
  }

  async deleteBoard(id: number): Promise<Board> {
    try {
      return await this.prisma.board.delete({
        where: { id },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(`Model Not Found. (${id})`);
      }
    }
  }
  async updateBoard(id: number, status: BoardStatus): Promise<Board> {
    return this.prisma.board.update({
      where: { id },
      data: {
        status,
      },
    });
  }
}
