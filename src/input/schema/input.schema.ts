import mongoose from 'mongoose';

export interface IInput {
  boardId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'link';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export const InputSchema = new mongoose.Schema<IInput>({
  boardId: { type: String },
  text: { type: String },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ['text', 'image', 'url'], default: 'text' },
  fileUrl: { type: String },
  fileName: { type: String },
  fileSize: { type: Number },
});
