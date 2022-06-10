import { BackofficePlan } from '../domain/BackofficePlan';

export class BackofficePlansResponse {
  readonly plans: Array<BackofficePlan>;

  constructor(plans: Array<BackofficePlan>) {
    this.plans = plans;
  }
}
