import { ApiProperty } from '@nestjs/swagger';
//import { RewardType } from '@prisma/client';
import {
  IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, ValidateIf, IsPositive,
} from 'class-validator';
import { RewardType } from 'generated/prisma';

export class CreateRewardRuleDto {
  @ApiProperty({ description: 'A description of the rule', example: 'Standard Card Purchase' })
  @IsString() @IsNotEmpty()
  ruleDescription: string;

  @ApiProperty({ description: 'The type of financial transaction this rule applies to', example: 'CardPurchase' })
  @IsString() @IsNotEmpty()
  financeTxType: string;

  @ApiProperty({ enum: RewardType, description: "The type of reward logic: 'Percentage' or 'Fixed'" })
  @IsEnum(RewardType) @IsNotEmpty()
  rewardType: RewardType;

  @ApiProperty({ description: 'The currency code of the reward', example: 'POINTS' })
  @IsString() @IsNotEmpty()
  rewardCurrencyCode: string;

  @ApiProperty({ description: "The reward percentage (required if rewardType is 'Percentage')", example: 1.5, required: false })
  @ValidateIf(o => o.rewardType === RewardType.Percentage) // Only validate if rewardType is 'Percentage'
  @IsNumber() @IsPositive() @IsNotEmpty()
  rewardPercentage?: number;

  @ApiProperty({ description: "The fixed reward amount (required if rewardType is 'Fixed')", example: 100, required: false })
  @ValidateIf(o => o.rewardType === RewardType.Fixed) // Only validate if rewardType is 'Fixed'
  @IsNumber() @IsPositive() @IsNotEmpty()
  fixedReward?: number;

  @ApiProperty({ description: 'Experience Points (XP) awarded by this rule', example: 10, default: 0, required: false })
  @IsNumber() @IsOptional()
  awardedXP?: number;

  @ApiProperty({ description: 'Internal notes about the rule', required: false })
  @IsString() @IsOptional()
  notes?: string;
}