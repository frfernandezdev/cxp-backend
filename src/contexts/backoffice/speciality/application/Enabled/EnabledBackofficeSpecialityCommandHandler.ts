import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityEnabler } from './BackofficeSpecialityEnabler';
import { EnabledBackofficeSpecialityCommand } from './EnabledBackofficeSpecialityCommand';

@CommandHandler(EnabledBackofficeSpecialityCommand)
export class EnabledBackofficeSpecialityCommandHandler
  implements ICommandHandler<EnabledBackofficeSpecialityCommand>
{
  constructor(private enabler: BackofficeSpecialityEnabler) {}

  async execute(command: EnabledBackofficeSpecialityCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeSpecialityId(item));

    await this.enabler.run(ids);
  }
}
