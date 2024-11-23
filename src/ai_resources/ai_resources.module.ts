import { Module } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';
import { AiResourcesController } from './ai_resources.controller';
import { InputModule } from 'src/input/input.module';
import { ChatModule } from 'src/chat/chat.module';
import { FileRetrieveModule } from 'src/file-retrieve/file-retrieve.module';

@Module({
  imports: [InputModule, ChatModule, FileRetrieveModule],
  providers: [AiResourcesService],
  controllers: [AiResourcesController],
})
export class AiResourcesModule {}
