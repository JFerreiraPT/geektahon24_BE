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

  @Get('/board/:boardId/messages')
  async getBoardMessages(
    @Param('boardId') boardId: string,
  ): Promise<IMessage[]> {
    return this.chatService.getMessagesFromChatByBoardId(boardId);
  }

  @Post(':chatId/messages')
  async storeMessage(
    @Param('chatId') chatId: string,
    @Body()
    body: {
      boardId: string;
      username: string;
      message: string;
      fileUrl: string;
      fileName: string;
      type: 'text' | 'image' | 'url';
    },
  ) {
    const { boardId, username, message, fileUrl, fileName, type } = body;
    return this.chatService.storeMessageInChat(
      boardId,
      chatId,
      username,
      message,
      fileUrl,
      fileName,
      type,
    );
  }
}
