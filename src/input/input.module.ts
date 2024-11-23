import { Module } from '@nestjs/common';
import { InputController } from './input.controller';
import { InputService } from './input.service';
import { ChatProviders } from './input.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InputController],
  providers: [InputService, ...ChatProviders],
})
export class InputModule {}
