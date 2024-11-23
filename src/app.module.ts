import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiResourcesModule } from './ai_resources/ai_resources.module';

@Module({
  imports: [AiResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
