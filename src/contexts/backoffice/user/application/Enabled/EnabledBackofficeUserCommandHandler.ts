import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeUserId } from '../../domain/BackofficeUserId';
import { BackofficeUserEnabler } from './BackofficeUserEnabler';
import { EnabledBackofficeUserCommand } from './EnabledBackofficeUserCommand';

@CommandHandler(EnabledBackofficeUserCommand)
export class EnabledBackofficeUserCommandHandler
  implements ICommandHandler<EnabledBackofficeUserCommand>
{
  constructor(private enabler: BackofficeUserEnabler) {}

  async execute(command: EnabledBackofficeUserCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeUserId(item));

    await this.enabler.run(ids);
  }
}
