import { BackofficeSearchAllUserQuery } from '../BackofficeSearchAllUserQuery';

describe('BackofficeSearchAllSpecialityQuery', () => {
  it('should search all query', () => {
    const query = new BackofficeSearchAllUserQuery();

    expect(query).toBeInstanceOf(BackofficeSearchAllUserQuery);
  });
});
