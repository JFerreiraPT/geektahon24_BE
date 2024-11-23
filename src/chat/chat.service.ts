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
    const chat = await this.chatModel
      .findById(chatId)
      .populate('messages')
      .exec();

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat.messages;
  }

  async storeMessageInChat(
    chatId: string,
    username: string,
    message: string,
    type: 'text' | 'image' | 'file',
  ): Promise<{ newMessage: IMessage; chatId: string }> {
    // Find or create the user
    let user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      user = await this.userModel.create({
        username,
        email: `${username}@example.com`,
      });
    }

    // Create a new message document
    const newMessage = new this.messageModel({
      sender: user._id,
      message,
      type,
      timestamp: new Date(),
    });

    await newMessage.save();

    // Attempt to find the chat by chatId
    let chat = await this.chatModel.findById(chatId).exec();

    if (!chat) {
      // If no chat is found, create a new chat
      chat = new this.chatModel({
        messages: [newMessage.id],
        participants: [user._id],
        createdAt: new Date(),
      });
      await chat.save();
    } else {
      // If the chat exists, push the new message into the chat
      chat.messages.push(newMessage.id);
      await chat.save();
    }

    // Return both the new message and the chatId
    return { newMessage, chatId: chat._id.toString() };
  }
}