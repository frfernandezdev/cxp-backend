import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficePlanCoin } from '../../domain/BackofficePlanCoin';
import { BackofficePlanDuration } from '../../domain/BackofficePlanDuration';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficePlanPrice } from '../../domain/BackofficePlanPrice';
import { BackofficePlanCreator } from './BackofficePlanCreator';
import { CreateBackofficePlanCommand } from './CreateBackofficePlanCommand';

@CommandHandler(CreateBackofficePlanCommand)
export class CreateBackofficePlanCommandHandler
  implements ICommandHandler<CreateBackofficePlanCommand>
{
  constructor(private creator: BackofficePlanCreator) {}

  async execute(command: CreateBackofficePlanCommand) {
    const planId = new BackofficePlanId(command.id);
    const planPrice = new BackofficePlanPrice(command.price);
    const planDuration = new BackofficePlanDuration(command.duration);
    const planCoin = new BackofficePlanCoin(command.coin);
    await this.creator.run({
      planId,
      planPrice,
      planDuration,
      planCoin,
    });
  }
}
