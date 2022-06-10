import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { BackofficeSQLiteModule } from '../BackofficeSQLiteModule';

describe('BackofficeSQLiteModule', () => {
  let factory: Connection;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BackofficeSQLiteModule],
    }).compile();

    factory = moduleRef.get<Connection>(Connection);
  });

  afterEach(async () => {
    await factory.close();
  });

  it('should verify connection if already established', () => {
    expect(factory).toBeInstanceOf(Connection);
    expect(factory.isConnected).toBeTruthy();
  });
});
