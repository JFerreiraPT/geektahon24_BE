import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { ChatSeederService } from './chat.seeder';

@Injectable()
export class ChatSeedCommand {
  constructor(private readonly chatSeederService: ChatSeederService) {}

  @Command({
    command: 'seed:chat',
    describe: 'Seed the MongoDB database with chats',
  })
  async run() {
    await this.chatSeederService.seed();
    return;
  }
}
