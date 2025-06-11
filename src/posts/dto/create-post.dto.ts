import { ApiProperty } from '@nestjs/swagger'; // <-- Import
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post', description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false, description: 'The content of the post' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ required: false, default: false, description: 'Whether the post is published' })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}