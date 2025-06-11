import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { RewardRulesModule } from './reward-rules/reward-rules.module';

@Module({
  imports: [PrismaModule, PostsModule, LoyaltyModule, RewardRulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
