import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IInput } from './schema/input.schema';
import { Model } from 'mongoose';

@Injectable()
export class InputService {
  constructor(@Inject('INPUT_MODEL') private inputModel: Model<IInput>) {}

  async getInputsByBoard(boardId: string): Promise<IInput[]> {
    const inputs = await this.inputModel.find({ boardId }).exec();
    if (!inputs || inputs.length === 0) {
      throw new NotFoundException(`No inputs found for boardId: ${boardId}`);
    }
    return inputs;
  }

  async storeInput(
    boardId: string,
    text: string,
    type: 'text' | 'image' | 'file' | 'link',
    fileUrl?: string,
    fileName?: string,
    fileSize?: number,
  ): Promise<IInput> {
    const newInput = new this.inputModel({
      boardId,
      text,
      type,
      fileUrl,
      fileName,
      fileSize,
    });
    return await newInput.save();
  }
}
