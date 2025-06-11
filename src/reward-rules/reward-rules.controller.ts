import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RewardRulesService } from './reward-rules.service';
import { CreateRewardRuleDto } from './dto/create-reward-rule.dto';
import { UpdateRewardRuleDto } from './dto/update-reward-rule.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('reward-rules')
@Controller('reward-rules')
export class RewardRulesController {
  constructor(private readonly rewardRulesService: RewardRulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reward rule' })
  @ApiResponse({ status: 201, description: 'The rule has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Input validation failed.' })
  create(@Body() createRewardRuleDto: CreateRewardRuleDto) {
    return this.rewardRulesService.create(createRewardRuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reward rules' })
  @ApiResponse({ status: 200, description: 'A list of all reward rules.' })
  findAll() {
    return this.rewardRulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single reward rule by its ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the reward rule.' })
  @ApiResponse({ status: 200, description: 'The requested reward rule.' })
  @ApiResponse({ status: 404, description: 'Reward rule not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rewardRulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing reward rule' })
  @ApiParam({ name: 'id', description: 'The UUID of the reward rule to update.' })
  @ApiResponse({ status: 200, description: 'The rule has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Reward rule not found.' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRewardRuleDto: UpdateRewardRuleDto) {
    return this.rewardRulesService.update(id, updateRewardRuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reward rule' })
  @ApiParam({ name: 'id', description: 'The UUID of the reward rule to delete.' })
  @ApiResponse({ status: 200, description: 'The rule has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Reward rule not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rewardRulesService.remove(id);
  }
}