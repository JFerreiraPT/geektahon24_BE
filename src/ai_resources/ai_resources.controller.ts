import { Controller, Get, Query } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';

@Controller('ai-resources')
export class AiResourcesController {
  constructor(private readonly aiResourceService: AiResourcesService) {}

  @Get('action-points')
  async getActionPoints(@Query('text') text: string) {
    if (!text) {
      return { message: 'Please provide a valid "text" query parameter.' };
    }
    return await this.aiResourceService.getActionPoints(text);
  }

  @Get('summary')
  async getSummary(@Query('text') text: string) {
    if (!text) {
      return { message: 'Please provide a valid "text" query parameter.' };
    }
    return await this.aiResourceService.getSummary(text);
  }

  @Get('documentation')
  async generateDocumentation(@Query('text') text: string) {
    if (!text) {
      return { message: 'Please provide a valid "text" query parameter.' };
    }
    return await this.aiResourceService.generateDocumentation(text);
  }
}
