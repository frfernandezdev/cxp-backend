import { BackofficeSearchAllPlanQuery } from '../BackofficeSearchAllPlanQuery';

describe('BackofficeSearchAllPlanQuery', () => {
  it('should search all query', () => {
    const query = new BackofficeSearchAllPlanQuery();

    expect(query).toBeInstanceOf(BackofficeSearchAllPlanQuery);
  });
});
