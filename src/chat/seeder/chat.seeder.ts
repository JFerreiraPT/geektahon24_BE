import { Inject, Injectable } from '@nestjs/common';
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
}
