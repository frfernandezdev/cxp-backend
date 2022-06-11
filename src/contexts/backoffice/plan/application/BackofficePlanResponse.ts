import { BackofficePlan } from '../domain/BackofficePlan';

export class BackofficePlanResponse {
  readonly plans: Array<BackofficePlan>;

  constructor(plans: Array<BackofficePlan>) {
    this.plans = plans;
  }
}
