import { Module } from '@nestjs/common';
import { FileRetrieveService } from './file-retrieve.service';

@Module({
  providers: [FileRetrieveService],
  exports: [FileRetrieveService],
})
export class FileRetrieveModule {}
