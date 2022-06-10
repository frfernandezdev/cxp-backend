import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityDisabler } from './BackofficeSpecialityDisabler';
import { DisabledBackofficeSpecialityCommand } from './DisabledBackofficeSpecialityCommand';

@CommandHandler(DisabledBackofficeSpecialityCommand)
export class DisabledBackofficeSpecialityCommandHandler
  implements ICommandHandler<DisabledBackofficeSpecialityCommand>
{
  constructor(private disabler: BackofficeSpecialityDisabler) {}

  async execute(command: DisabledBackofficeSpecialityCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeSpecialityId(item));

    await this.disabler.run(ids);
  }
}
