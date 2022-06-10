import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficePlanCoin } from '../../domain/BackofficePlanCoin';
import { BackofficePlanDuration } from '../../domain/BackofficePlanDuration';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficePlanPrice } from '../../domain/BackofficePlanPrice';
import { BackofficePlanUpdater } from './BackofficePlanUpdater';
import { UpdateBackofficePlanCommand } from './UpdateBackofficePlanCommand';

@CommandHandler(UpdateBackofficePlanCommand)
export class UpdateBackofficePlanCommandHandler
  implements ICommandHandler<UpdateBackofficePlanCommand>
{
  constructor(private updater: BackofficePlanUpdater) {}

  async execute(command: UpdateBackofficePlanCommand) {
    const planId = new BackofficePlanId(command.id);
    const planPrice = new BackofficePlanPrice(command.price);
    const planDuration = new BackofficePlanDuration(command.duration);
    const planCoin = new BackofficePlanCoin(command.coin);

    await this.updater.run({
      planId,
      planPrice,
      planDuration,
      planCoin,
    });
  }
}
