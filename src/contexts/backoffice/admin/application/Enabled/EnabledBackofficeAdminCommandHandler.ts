import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';
import { BackofficeAdminEnabler } from './BackofficeAdminEnabler';
import { EnabledBackofficeAdminCommand } from './EnabledBackofficeAdminCommand';

@CommandHandler(EnabledBackofficeAdminCommand)
export class EnabledBackofficeAdminCommandHandler
  implements ICommandHandler<EnabledBackofficeAdminCommand>
{
  constructor(private enabler: BackofficeAdminEnabler) {}

  async execute(command: EnabledBackofficeAdminCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeAdminId(item));

    await this.enabler.run(ids);
  }
}
