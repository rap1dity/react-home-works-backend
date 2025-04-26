import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export abstract class CommonResponseRTO<T> {
  @ApiProperty({ enum: HttpStatus })
  code: HttpStatus;

  @ApiPropertyOptional()
  message?: string[];

  @ApiProperty({ nullable: true })
  abstract data: T | null;

  @ApiProperty({ type: String, nullable: true, default: null })
  error: string | null;
}
