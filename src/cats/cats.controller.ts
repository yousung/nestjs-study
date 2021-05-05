import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Controller('cats')
@ApiTags('cat')
@ApiResponse({ status: 200 })
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiBody({ type: CreateCatDto, description: '이름은 필수 항목입니다.' })
  @ApiCreatedResponse({ description: '성공', type: Cat })
  @ApiOperation({ summary: '애완동물을 등록합니다' })
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: '보유한 애완동물 리스트' })
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '보유한 애완동물 하나' })
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCatDto })
  @ApiResponse({ status: 200, type: Cat })
  @ApiOperation({ summary: '보유한 애완동물 하나 업데이트' })
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: '보유한 애완동물 삭제' })
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
