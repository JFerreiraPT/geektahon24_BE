import mongoose, { Schema, Types } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
}

export interface IMessage {
  sender: Types.ObjectId | IUser;
  message: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export interface IChat {
  chatName?: string;
  users: Types.ObjectId[] | IUser[];
  messages: IMessage[];
}

export const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

export const MessageSchema = new mongoose.Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
});

export const ChatSchema = new mongoose.Schema<IChat>({
  chatName: { type: String, default: 'Chat Room' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});
