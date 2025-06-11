import { Test, TestingModule } from '@nestjs/testing';
import { RewardRulesController } from './reward-rules.controller';

describe('RewardRulesController', () => {
  let controller: RewardRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRulesController],
    }).compile();

    controller = module.get<RewardRulesController>(RewardRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
