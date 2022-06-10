import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';
import { BackofficeAdminDisabler } from './BackofficeAdminDisabler';
import { DisabledBackofficeAdminCommand } from './DisabledBackofficeAdminCommand';

@CommandHandler(DisabledBackofficeAdminCommand)
export class DisabledBackofficeAdminCommandHandler
  implements ICommandHandler<DisabledBackofficeAdminCommand>
{
  constructor(private disabler: BackofficeAdminDisabler) {}

  async execute(command: DisabledBackofficeAdminCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeAdminId(item));

    await this.disabler.run(ids);
  }
}
