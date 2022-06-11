export class BackofficeSearchAdminByCriteriaQuery {
  constructor(
    readonly filters: Array<Map<string, string>>,
    readonly orderBy?: string,
    readonly orderType?: string,
    readonly limit?: number,
    readonly offset?: number,
  ) {
    this.filters = filters;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.limit = limit;
    this.offset = offset;
  }
}
