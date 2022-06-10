import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeUserId } from '../../domain/BackofficeUserId';
import { BackofficeUserDeleter } from './BackofficeUserDeleter';
import { DeleteBackofficeUserCommand } from './DeleteBackofficeUserCommand';

@CommandHandler(DeleteBackofficeUserCommand)
export class DeleteBackofficeUserCommandHandler
  implements ICommandHandler<DeleteBackofficeUserCommand>
{
  constructor(private deleter: BackofficeUserDeleter) {}

  async execute(command: DeleteBackofficeUserCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeUserId(item));

    await this.deleter.run(ids);
  }
}
