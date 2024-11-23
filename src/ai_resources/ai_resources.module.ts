import { Module } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';
import { AiResourcesController } from './ai_resources.controller';
import { InputModule } from 'src/input/input.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [InputModule, ChatModule],
  providers: [AiResourcesService],
  controllers: [AiResourcesController],
})
export class AiResourcesModule {}
