import { BackofficeSearchAllAdminQuery } from '../BackofficeSearchAllAdminQuery';

describe('BackofficeSearchAllAdminQuery', () => {
  it('should search all query', () => {
    const query = new BackofficeSearchAllAdminQuery();

    expect(query).toBeInstanceOf(BackofficeSearchAllAdminQuery);
  });
});
