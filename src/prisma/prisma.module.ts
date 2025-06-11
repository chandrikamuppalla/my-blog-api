import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Make the module global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export for dependency injection
})
export class PrismaModule {}