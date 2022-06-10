import {
  Between,
  Equal,
  FindOperator,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
import { Criteria } from '../../domain/criteria/Criteria';
import { Filter } from '../../domain/criteria/Filter';
import { Operator } from '../../domain/criteria/FilterOperator';
import { Filters } from '../../domain/criteria/Filters';
import { Order } from '../../domain/criteria/Order';

type QueryObject = {
  field: string;
  value: FindOperator<string>;
};

type QueryBuilder = {
  [key: string]: any;
};

interface TransformerFunction<T, K> {
  (value: T): K;
}

export class SQLiteCriteriaConverter {
  private queryTransformers: Map<
    Operator,
    TransformerFunction<Filter, QueryObject>
  >;

  constructor() {
    this.queryTransformers = new Map<
      Operator,
      TransformerFunction<Filter, QueryObject>
    >([
      [Operator.EQUAL, this.equalQuery],
      [Operator.NOT_EQUAL, this.noEqualQuery],
      [Operator.GT, this.greaterThanQuery],
      [Operator.LT, this.lessThanQuery],
      [Operator.GOET, this.greaterOrEqualThanQuery],
      [Operator.LOET, this.lessOrEqualThanQuery],
      [Operator.CONTAINS, this.containsThanQuery],
      [Operator.NOT_CONTAINS, this.notContainsThanQuery],
      [Operator.LIKE, this.likeThanQuery],
      [Operator.NOT_LIKE, this.notLikeThanQuery],
      [Operator.ILIKE, this.ilikeThanQuery],
      [Operator.NOT_LIKE, this.notIlikeThanQuery],
      [Operator.BETWEEN, this.betweenThanQuery],
      [Operator.NOT_BETWEEN, this.notBetweenThantQuery],
    ]);
  }

  public convert(criteria: Criteria): QueryBuilder {
    let body = {};

    body['skip'] = criteria.offset;
    body['take'] = criteria.limit;

    if (criteria.hasOrder()) {
      body['order'] = {};
      body = this.generateQueryOrder(body, criteria.order);
    }

    if (criteria.hasFilters()) {
      body['where'] = {};
      body = this.generateQueryFilter(body, criteria.filters);
    }

    return body;
  }

  protected generateQueryOrder(body: QueryBuilder, order: Order): QueryBuilder {
    const field = order.orderBy.value;
    const value = order.orderType.value;
    body['order'][field] = value;
    return body;
  }

  protected generateQueryFilter(
    body: QueryBuilder,
    filters: Filters,
  ): QueryBuilder {
    filters.filters.map((filter) => {
      const { field, value } = this.queryForFilter(filter);

      body['where'][field] = value;
    });
    return body;
  }

  private queryForFilter(filter: Filter): QueryObject {
    const functionToApply = this.queryTransformers.get(filter.operator.value);

    if (!functionToApply) {
      throw Error(`Unexpected operator value ${filter.operator.value}`);
    }

    return functionToApply.call(this, filter);
  }

  private extract(filter: Filter) {
    const field = filter.field.value;
    const value = filter.value.value;
    return { field, value };
  }

  private equalQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: Equal(value) };
  }

  private noEqualQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: Not(Equal(value)) };
  }

  private greaterThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: MoreThan(value) };
  }

  private greaterOrEqualThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: MoreThanOrEqual(value) };
  }

  private lessThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: LessThan(value) };
  }

  private lessOrEqualThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: LessThanOrEqual(value) };
  }

  private containsThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: In(value.split(',')) };
  }

  private notContainsThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: Not(In(value.split(','))) };
  }

  private likeThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: Like(`%${value}%`) };
  }

  private notLikeThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: Not(Like(`%${value}%`)) };
  }

  private ilikeThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: ILike(`%${value}%`) };
  }

  private notIlikeThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    return { field, value: Not(ILike(`%${value}%`)) };
  }

  private betweenThanQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    const [from, to] = value.split(',');
    return { field, value: Between(from, to) };
  }

  private notBetweenThantQuery(filter: Filter): QueryObject {
    const { field, value } = this.extract(filter);
    const [from, to] = value.split(',');
    return { field, value: Not(Between(from, to)) };
  }
}
