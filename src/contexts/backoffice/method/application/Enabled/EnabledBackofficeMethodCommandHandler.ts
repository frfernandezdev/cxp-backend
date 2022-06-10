import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';
import { BackofficeMethodEnabler } from './BackofficeMethodEnabler';
import { EnabledBackofficeMethodCommand } from './EnabledBackofficeMethodCommand';

@CommandHandler(EnabledBackofficeMethodCommand)
export class EnabledBackofficeMethodCommandHandler
  implements ICommandHandler<EnabledBackofficeMethodCommand>
{
  constructor(private enabler: BackofficeMethodEnabler) {}

  async execute(command: EnabledBackofficeMethodCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeMethodId(item));

    await this.enabler.run(ids);
  }
}
