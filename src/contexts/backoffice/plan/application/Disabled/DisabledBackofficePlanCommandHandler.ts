import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficePlanDisabler } from './BackofficePlanDisabler';
import { DisabledBackofficePlanCommand } from './DisabledBackofficePlanCommand';

@CommandHandler(DisabledBackofficePlanCommand)
export class DisabledBackofficePlanCommandHandler
  implements ICommandHandler<DisabledBackofficePlanCommand>
{
  constructor(private disabler: BackofficePlanDisabler) {}

  async execute(command: DisabledBackofficePlanCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficePlanId(item));

    await this.disabler.run(ids);
  }
}
