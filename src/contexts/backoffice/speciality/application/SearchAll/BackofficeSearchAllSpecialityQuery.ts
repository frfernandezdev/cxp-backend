export class BackofficeSearchAllSpecialityQuery {
  constructor(readonly offset?: number, readonly limit?: number) {
    this.offset = offset;
    this.limit = limit;
  }
}
