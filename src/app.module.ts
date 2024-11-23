import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiResourcesModule } from './ai_resources/ai_resources.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { InputModule } from './input/input.module';
import { FileRetrieveModule } from './file-retrieve/file-retrieve.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AiResourcesModule,
    DatabaseModule,
    ChatModule,
    InputModule,
    FileRetrieveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
