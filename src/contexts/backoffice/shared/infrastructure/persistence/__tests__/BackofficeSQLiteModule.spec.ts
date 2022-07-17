import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { BackofficeSQLiteModule } from '../BackofficeSQLiteModule';

describe('BackofficeSQLiteModule', () => {
  let factory: DataSource;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
    }).compile();

    factory = moduleRef.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    await factory.destroy();
  });

  it('should verify connection if already established', () => {
    expect(factory).toBeInstanceOf(DataSource);
    expect(factory.isInitialized).toBeTruthy();
  });
});
