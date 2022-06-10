import { BackofficeSearchUserByCriteriaQuery } from '../BackofficeSearchUserByCriteriaQuery';

describe('BackofficeSearchUserByCriteriaQuery', () => {
  it('should search by criteria query', () => {
    const filter = new Map();
    filter.set('field', 'id');
    filter.set('operator', '=');
    filter.set('value', 'id');

    const orderBy = 'id';
    const orderType = 'ASC';
    const limit = 10;
    const offset = 0;
    const query = new BackofficeSearchUserByCriteriaQuery(
      [filter],
      orderBy,
      orderType,
      limit,
      offset,
    );

    expect(query).toBeInstanceOf(BackofficeSearchUserByCriteriaQuery);
    expect(query.filters).toEqual([filter]);
    expect(query.orderBy).toBe(orderBy);
    expect(query.orderType).toBe(orderType);
    expect(query.limit).toBe(limit);
    expect(query.offset).toBe(offset);
  });
});
