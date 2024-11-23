import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiStuffModule } from './ai_stuff/ai_stuff.module';
import { AiResourcesModule } from './ai_resources/ai_resources.module';

@Module({
  imports: [AiStuffModule, AiResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
