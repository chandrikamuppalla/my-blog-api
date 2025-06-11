import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class AddWalletDto {
  @ApiProperty({
    description: 'The currency code for the new wallet (e.g., POINTS, USDT).',
    example: 'POINTS',
  })
  @IsString()
  @IsNotEmpty()
  currencyCode: string;

  @ApiProperty({
    description: 'Optional starting balance for the wallet.',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  initialBalance?: number;
}