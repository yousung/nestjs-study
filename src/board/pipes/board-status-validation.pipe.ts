import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const boardStatusArray: string[] = [];
    for (const boardStatus in BoardStatus) {
      boardStatusArray.push(boardStatus);
    }

    if (boardStatusArray.indexOf(value) == -1) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }
}
