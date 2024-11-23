import { Module } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';
import { AiResourcesController } from './ai_resources.controller';

@Module({
  providers: [AiResourcesService],
  controllers: [AiResourcesController],
})
export class AiResourcesModule {}
