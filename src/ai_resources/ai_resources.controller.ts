import { Controller, Post, Body } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';

@Controller('ai-resources')
export class AiResourcesController {
  constructor(private readonly aiResourceService: AiResourcesService) {}

  @Post('action-points')
  async getActionPoints(@Body() body: { text: string }) {
    if (!body.text) {
      return { message: 'Please provide a valid "text" in the request body.' };
    }
    return await this.aiResourceService.getActionPoints(body.text);
  }

  @Post('summary')
  async getSummary(@Body() body: { text: string }) {
    if (!body.text) {
      return { message: 'Please provide a valid "text" in the request body.' };
    }
    return await this.aiResourceService.getSummary(body.text);
  }

  @Post('documentation')
  async generateDocumentation(@Body() body: { text: string }) {
    if (!body.text) {
      return { message: 'Please provide a valid "text" in the request body.' };
    }
    return await this.aiResourceService.generateDocumentation(body.text);
  }
}
