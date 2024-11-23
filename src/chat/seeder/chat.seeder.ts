import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IChat, IMessage, IUser } from '../schema/chat.schema';

@Injectable()
export class ChatSeederService {
  constructor(
    @Inject('MESSAGE_MODEL') private messageModel: Model<IMessage>,
    @Inject('USER_MODEL') private userModel: Model<IUser>,
    @Inject('CHAT_MODEL') private chatModel: Model<IChat>,
  ) {}

  async seed(): Promise<void> {
    await this.userModel.deleteMany({});
    await this.messageModel.deleteMany({});
    await this.chatModel.deleteMany({});

    const users = await this.userModel.insertMany([
      { username: 'Alice', email: 'alice@example.com' },
      { username: 'Bob', email: 'bob@example.com' },
    ]);

    const messages = await this.messageModel.insertMany([
      {
        sender: users[0]._id,
        message: 'Hello, Bob!',
        type: 'text',
        timestamp: new Date(),
      },
      {
        sender: users[1]._id,
        message: 'Hi, Alice!',
        type: 'text',
        timestamp: new Date(),
      },
    ]);

    await this.chatModel.create({
      chatName: 'Test Chat',
      users: [users[0]._id, users[1]._id],
      messages: messages.map((msg) => msg._id),
    });

    console.log('Database seeding completed successfully.');
  }

  async storeFileInChat(
    chatId: string,
    username: string,
    fileUrl: string,
    fileName: string,
    fileSize: number,
  ): Promise<{ newMessage: IMessage; chatId: string }> {
    let user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      user = await this.userModel.create({
        username,
        email: `${username}@example.com`,
      });
    }

    const newMessage = new this.messageModel({
      sender: user._id,
      message: '',
      type: 'file',
      fileUrl,
      fileName,
      fileSize,
      timestamp: new Date(),
    });

    await newMessage.save();

    const chat = await this.chatModel.findById(chatId).exec();
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    chat.messages.push(newMessage.id);
    await chat.save();

    return { newMessage, chatId: chat._id.toString() };
  }
}
