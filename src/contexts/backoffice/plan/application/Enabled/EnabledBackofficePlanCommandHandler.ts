import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficePlanEnabler } from './BackofficePlanEnabler';
import { EnabledBackofficePlanCommand } from './EnabledBackofficePlanCommand';

@CommandHandler(EnabledBackofficePlanCommand)
export class EnabledBackofficePlanCommandHandler
  implements ICommandHandler<EnabledBackofficePlanCommand>
{
  constructor(private enabler: BackofficePlanEnabler) {}

  async execute(command: EnabledBackofficePlanCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficePlanId(item));

    await this.enabler.run(ids);
  }
}
