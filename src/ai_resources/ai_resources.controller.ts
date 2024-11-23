import { Controller, Post, Body, Param } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';

@Controller('ai-resources')
export class AiResourcesController {
  constructor(private readonly aiResourceService: AiResourcesService) {}

  @Post(':boardId/action-points')
  async getActionPoints(
    @Param('boardId') boardId: string,
    @Body() body: { inputs: string[]; chatId: string },
  ) {
    const { inputs, chatId } = body;
    return await this.aiResourceService.getActionPoints(
      boardId,
      inputs,
      chatId,
    );
  }

  @Post(':boardId/summary')
  async getSummary(
    @Body() body: { inputs: string[]; chatId: string },
    @Param('boardId') boardId: string,
  ) {
    const { inputs, chatId } = body;
    return await this.aiResourceService.getSummary(boardId, inputs, chatId);
  }

  @Post(':boardId/documentation')
  async generateDocumentation(
    @Body() body: { inputs: string[]; chatId: string },
    @Param('boardId') boardId: string,
  ) {
    const { inputs, chatId } = body;
    return await this.aiResourceService.generateDocumentation(
      boardId,
      inputs,
      chatId,
    );
  }

  @Post(':boardId/tasks')
  async generateTasks(
    @Body() body: { inputs: string[]; chatId: string },
    @Param('boardId') boardId: string,
  ) {
    const { inputs, chatId } = body;
    return await this.aiResourceService.generateTasks(boardId, inputs, chatId);
  }
}
