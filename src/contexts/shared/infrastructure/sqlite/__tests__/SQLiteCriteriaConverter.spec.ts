import { Criteria } from 'src/contexts/shared/domain/criteria/Criteria';
import { Filter } from 'src/contexts/shared/domain/criteria/Filter';
import { FilterField } from 'src/contexts/shared/domain/criteria/FilterField';
import { FilterOperator } from 'src/contexts/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/contexts/shared/domain/criteria/Filters';
import { FilterValue } from 'src/contexts/shared/domain/criteria/FilterValue';
import { Order } from 'src/contexts/shared/domain/criteria/Order';
import { OrderBy } from 'src/contexts/shared/domain/criteria/OrderBy';
import {
  OrderType,
  OrderTypes,
} from 'src/contexts/shared/domain/criteria/OrderType';
import { Equal } from 'typeorm';
import { SQLiteCriteriaConverter } from '../SQLiteCriteriaConverter';

describe('SQLiteCriteriaConverter', () => {
  it('should generate a query with offset and limit by default', () => {
    const filter = new Filter(
      new FilterField('email'),
      FilterOperator.fromValue('='),
      new FilterValue('johndoe@mail.com'),
    );
    const filters = new Filters([filter]);
    const criteria = new Criteria(filters);

    const converter = new SQLiteCriteriaConverter();

    const query = converter.convert(criteria);

    expect(query).toMatchObject({
      take: 100,
      where: {
        email: Equal('johndoe@mail.com'),
      },
    });
  });

  it('should generate a query with order', () => {
    const filter = new Filter(
      new FilterField('email'),
      FilterOperator.fromValue('='),
      new FilterValue('johndoe@mail.com'),
    );
    const filters = new Filters([filter]);
    const order = new Order(
      new OrderBy('uid'),
      OrderType.fromValue(OrderTypes.ASC),
    );
    const criteria = new Criteria(filters, order);

    const converter = new SQLiteCriteriaConverter();

    const query = converter.convert(criteria);

    expect(query).toMatchObject({
      take: 100,
      skip: 0,
      order: { uid: 'asc' },
      where: {
        email: Equal('johndoe@mail.com'),
      },
    });
  });

  it('should generate a query with offset and limit', () => {
    const filter = new Filter(
      new FilterField('email'),
      FilterOperator.fromValue('='),
      new FilterValue('johndoe@mail.com'),
    );
    const order = new Order(
      new OrderBy('uid'),
      OrderType.fromValue(OrderTypes.ASC),
    );
    const filters = new Filters([filter]);
    const criteria = new Criteria(filters, order, 200, 10);

    const converter = new SQLiteCriteriaConverter();

    const query = converter.convert(criteria);

    expect(query).toMatchObject({
      take: 200,
      skip: 10,
      order: { uid: 'asc' },
      where: {
        email: Equal('johndoe@mail.com'),
      },
    });
  });
});
