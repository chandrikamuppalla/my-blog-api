import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRewardRuleDto } from './dto/create-reward-rule.dto';
import { UpdateRewardRuleDto } from './dto/update-reward-rule.dto';
import { Prisma } from 'generated/prisma';
//import { Prisma } from '@prisma/client';

@Injectable()
export class RewardRulesService {
  constructor(private prisma: PrismaService) {}

  create(createRewardRuleDto: CreateRewardRuleDto) {
    // Prisma's decimal type expects a specific object, so we convert it
    const data: Prisma.RewardRuleCreateInput = {
      ...createRewardRuleDto,
      rewardPercentage: createRewardRuleDto.rewardPercentage,
      fixedReward: createRewardRuleDto.fixedReward,
    };
    return this.prisma.rewardRule.create({ data });
  }

  findAll() {
    return this.prisma.rewardRule.findMany();
  }

  async findOne(id: string) {
    const rule = await this.prisma.rewardRule.findUnique({ where: { id } });
    if (!rule) {
      throw new NotFoundException(`Reward rule with ID ${id} not found.`);
    }
    return rule;
  }

  async update(id: string, updateRewardRuleDto: UpdateRewardRuleDto) {
    try {
      return await this.prisma.rewardRule.update({
        where: { id },
        data: {
            ...updateRewardRuleDto,
            rewardPercentage: updateRewardRuleDto.rewardPercentage,
            fixedReward: updateRewardRuleDto.fixedReward,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Reward rule with ID ${id} not found.`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    // First, check if the rule exists
    await this.findOne(id);
    // If it exists, delete it
    return this.prisma.rewardRule.delete({ where: { id } });
  }
}