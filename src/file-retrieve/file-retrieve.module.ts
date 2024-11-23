import { Module } from '@nestjs/common';
import { FileRetrieveService } from './file-retrieve.service';

@Module({
  providers: [FileRetrieveService]
})
export class FileRetrieveModule {}
