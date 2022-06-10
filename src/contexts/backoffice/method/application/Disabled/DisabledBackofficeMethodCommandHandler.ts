import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';
import { BackofficeMethodDisabler } from './BackofficeMethodDisabler';
import { DisabledBackofficeMethodCommand } from './DisabledBackofficeMethodCommand';

@CommandHandler(DisabledBackofficeMethodCommand)
export class DisabledBackofficeMethodCommandHandler
  implements ICommandHandler<DisabledBackofficeMethodCommand>
{
  constructor(private disabler: BackofficeMethodDisabler) {}

  async execute(command: DisabledBackofficeMethodCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeMethodId(item));

    await this.disabler.run(ids);
  }
}
