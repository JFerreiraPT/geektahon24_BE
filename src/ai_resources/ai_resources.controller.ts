import { Controller, Post, Body } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';

@Controller('ai-resources')
export class AiResourcesController {
  constructor(private readonly aiResourceService: AiResourcesService) {}

  @Post('action-points')
  async getActionPoints(@Body() body: { inputs: string[]; chatId: string }) {
    const { inputs, chatId } = body;
    return await this.aiResourceService.getActionPoints(inputs, chatId);
  }

  @Post('summary')
  async getSummary(@Body() body: { inputs: string[]; chatId: string }) {
    const { inputs, chatId } = body;
    return await this.aiResourceService.getSummary(inputs, chatId);
  }

  @Post('documentation')
  async generateDocumentation(
    @Body() body: { inputs: string[]; chatId: string },
  ) {
    const { inputs, chatId } = body;
    return await this.aiResourceService.generateDocumentation(inputs, chatId);
  }
}
