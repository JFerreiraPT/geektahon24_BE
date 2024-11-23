import { Test, TestingModule } from '@nestjs/testing';
import { FileRetrieveService } from './file-retrieve.service';

describe('FileRetrieveService', () => {
  let service: FileRetrieveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileRetrieveService],
    }).compile();

    service = module.get<FileRetrieveService>(FileRetrieveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
