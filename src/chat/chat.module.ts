import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ChatProviders } from './chat.providers';
import { ChatSeederService } from './seeder/chat.seeder';
import { ChatSeedCommand } from './seeder/chat.command';

@Module({
  imports: [DatabaseModule],
  providers: [
    ChatService,
    ChatSeederService,
    ChatSeedCommand,
    ...ChatProviders,
  ],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
