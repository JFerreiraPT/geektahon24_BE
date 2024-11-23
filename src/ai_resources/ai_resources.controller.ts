import { Controller, Get } from '@nestjs/common';
import { AiResourcesService } from './ai_resources.service';

@Controller('ai-resources')
export class AiResourcesController {
  constructor(private readonly aiResourceService: AiResourcesService) {}

  @Get('test2')
  helloWorld() {
    return this.aiResourceService.testCall();
  }
}
