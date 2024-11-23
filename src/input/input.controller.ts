import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { InputService } from './input.service';
import { IInput } from './schema/input.schema';

@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Post(':boardId/inputs')
  async storeInput(
    @Param('boardId') boardId: string,
    @Body()
    body: {
      text: string;
      type: 'text' | 'image' | 'file' | 'link';
      fileUrl?: string;
      fileName?: string;
      fileSize?: number;
    },
  ): Promise<IInput> {
    const { text, type, fileUrl, fileName, fileSize } = body;
    return this.inputService.storeInput(
      boardId,
      text,
      type,
      fileUrl,
      fileName,
      fileSize,
    );
  }

  @Get(':boardId/inputs')
  async getInputs(@Param('boardId') boardId: string): Promise<IInput[]> {
    return this.inputService.getInputsByBoard(boardId);
  }
}
