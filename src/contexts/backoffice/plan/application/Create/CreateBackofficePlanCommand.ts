export class CreateBackofficePlanCommand {
  readonly id: string;
  readonly price: number;
  readonly duration: number;
  readonly coin: string;

  constructor({
    id,
    price,
    duration,
    coin,
  }: {
    id: string;
    price: number;
    duration: number;
    coin: string;
  }) {
    this.id = id;
    this.price = price;
    this.duration = duration;
    this.coin = coin;
  }
}
