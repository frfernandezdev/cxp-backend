import { Filters } from './Filters';
import { Order } from './Order';

export class Criteria {
  readonly filters: Filters;
  readonly order: Order;
  readonly limit?: number;
  readonly offset?: number;

  constructor(
    filters: Filters,
    order?: Order,
    limit?: number,
    offset?: number,
  ) {
    this.filters = filters;
    this.order = order;
    this.offset = offset || 0;
    this.limit = limit || 100;
  }

  public hasFilters(): boolean {
    return this.filters.filters.length > 0;
  }

  public hasOrder(): boolean {
    return this.order ? this.order.hasOrder() : false;
  }
}
