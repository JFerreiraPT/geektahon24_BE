import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { IMessage } from './schema/chat.schema';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':chatId/messages')
  async getMessages(@Param('chatId') chatId: string): Promise<IMessage[]> {
    return this.chatService.getMessagesFromChat(chatId);
  }

  @Post(':chatId/messages')
  async storeMessage(
    @Param('chatId') chatId: string,
    @Body()
    body: {
      username: string;
      message: string;
      fileUrl: string;
      fileName: string;
      type: 'text' | 'image' | 'url';
    },
  ) {
    const { username, message, fileUrl, fileName, type } = body;
    return this.chatService.storeMessageInChat(
      chatId,
      username,
      message,
      fileUrl,
      fileName,
      type,
    );
  }
}
