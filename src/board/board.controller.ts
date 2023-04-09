import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from '@prisma/client';
import { BoardStatus } from './board.model';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  async getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Patch(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoard(+id, status);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<Board> {
    return this.boardService.deleteBoard(+id);
  }
}
