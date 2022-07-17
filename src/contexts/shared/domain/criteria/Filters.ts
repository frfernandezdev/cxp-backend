import { Filter } from './Filter';

export class Filters {
  readonly filters: Filter[];

  static fromValues(filters: Array<Map<string, string>>): Filters {
    return new Filters(filters.map(Filter.fromValues));
  }

  static none(): Filters {
    return new Filters([]);
  }

  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  hasFilters() {
    return this.filters ? this.filters.length > 0 : false;
  }
}
