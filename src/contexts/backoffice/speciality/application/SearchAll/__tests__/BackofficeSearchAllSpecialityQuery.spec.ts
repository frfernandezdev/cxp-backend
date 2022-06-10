import { BackofficeSearchAllSpecialityQuery } from '../BackofficeSearchAllSpecialityQuery';

describe('BackofficeSearchAllSpecialityQuery', () => {
  it('should search all query', () => {
    const query = new BackofficeSearchAllSpecialityQuery();

    expect(query).toBeInstanceOf(BackofficeSearchAllSpecialityQuery);
  });
});
