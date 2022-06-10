import { AggregateRoot } from '@nestjs/cqrs';
import { BackofficePlanCoin } from './BackofficePlanCoin';
import { BackofficePlanDuration } from './BackofficePlanDuration';
import { BackofficePlanId } from './BackofficePlanId';
import { BackofficePlanPrice } from './BackofficePlanPrice';

export class BackofficePlan extends AggregateRoot {
  constructor(
    private readonly id: BackofficePlanId,
    private readonly price: BackofficePlanPrice,
    private readonly duration: BackofficePlanDuration,
    private readonly coin: BackofficePlanCoin,
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    price: number;
    duration: number;
    coin: string;
  }): BackofficePlan {
    return new BackofficePlan(
      new BackofficePlanId(plainData.id),
      new BackofficePlanPrice(plainData.price),
      new BackofficePlanDuration(plainData.duration),
      new BackofficePlanCoin(plainData.coin),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      price: this.price.value,
      duration: this.duration.value,
      coin: this.coin.value,
    };
  }
}
