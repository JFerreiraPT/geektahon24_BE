import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiResourcesModule } from './ai_resources/ai_resources.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { InputModule } from './input/input.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AiResourcesModule,
    DatabaseModule,
    ChatModule,
    InputModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
