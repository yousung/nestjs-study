import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty({ message: '이름은 필수 항목입니다' })
  @Length(2, 50, { message: '이름은 2글자에서 50글자 사이로 지어야합니다.' })
  @ApiProperty({ description: '애완동물의 이름' })
  name: string;

  @ApiProperty({ description: '애완동물의 종류' })
  @IsString()
  type?: string;
}
