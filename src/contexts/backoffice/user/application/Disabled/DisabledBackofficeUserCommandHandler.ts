import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeUserId } from '../../domain/BackofficeUserId';
import { BackofficeUserDisabler } from './BackofficeUserDisabler';
import { DisabledBackofficeUserCommand } from './DisabledBackofficeUserCommand';

@CommandHandler(DisabledBackofficeUserCommand)
export class DisabledBackofficeUserCommandHandler
  implements ICommandHandler<DisabledBackofficeUserCommand>
{
  constructor(private disabler: BackofficeUserDisabler) {}

  async execute(command: DisabledBackofficeUserCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeUserId(item));

    await this.disabler.run(ids);
  }
}
