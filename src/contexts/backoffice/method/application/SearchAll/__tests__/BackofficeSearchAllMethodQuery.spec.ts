import { BackofficeSearchAllMethodQuery } from '../BackofficeSearchAllMethodQuery';

describe('BackofficeSearchAllMethodQuery', () => {
  it('should search all query', () => {
    const query = new BackofficeSearchAllMethodQuery();

    expect(query).toBeInstanceOf(BackofficeSearchAllMethodQuery);
  });
});
