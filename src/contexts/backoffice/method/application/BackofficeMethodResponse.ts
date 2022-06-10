import { BackofficeMethod } from '../domain/BackofficeMethod';

export class BackofficeMethodResponse {
  readonly methods: Array<BackofficeMethod>;

  constructor(methods: Array<BackofficeMethod>) {
    this.methods = methods;
  }
}
