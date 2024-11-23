import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IChat, IMessage, IUser } from './schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @Inject('MESSAGE_MODEL') private messageModel: Model<IMessage>,
    @Inject('USER_MODEL') private userModel: Model<IUser>,
    @Inject('CHAT_MODEL') private chatModel: Model<IChat>,
  ) {}

  async getMessagesFromChat(chatId: string): Promise<IMessage[]> {
    if (!chatId) return null;
    const chat = await this.chatModel
      .findById(chatId)
      .populate('messages')
      .exec();

    return chat.messages;
  }

  async getMessagesFromChatByBoardId(boardId: string): Promise<IMessage[]> {
    const chat = await this.chatModel
      .findOne({ boardId: boardId })
      .populate('messages')
      .exec();

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat.messages;
  }

  async storeMessageInChat(
    boardId: string,
    chatId: string,
    username: string,
    message: string,
    fileUrl: string,
    fileName: string,
    type: 'text' | 'image' | 'url',
  ): Promise<{ newMessage: IMessage; chatId: string; boardId: string }> {
    let user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      user = await this.userModel.create({
        username,
        email: `${username}@example.com`,
      });
    }

    const newMessage = new this.messageModel({
      sender: user._id,
      message,
      fileUrl,
      fileName,
      type,
      timestamp: new Date(),
    });

    await newMessage.save();

    let chat = await this.chatModel.findById(chatId).exec();

    if (!chat) {
      chat = new this.chatModel({
        boardId,
        messages: [newMessage.id],
        participants: [user._id],
        createdAt: new Date(),
      });
      await chat.save();
    } else {
      chat.messages.push(newMessage.id);
      await chat.save();
    }

    return { newMessage, chatId: chat._id.toString(), boardId: boardId };
  }
}
