import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';
import { BackofficeAdminDeleter } from './BackofficeAdminDeleter';
import { DeleteBackofficeAdminCommand } from './DeleteBackofficeAdminCommand';

@CommandHandler(DeleteBackofficeAdminCommand)
export class DeleteBackofficeAdminCommandHandler
  implements ICommandHandler<DeleteBackofficeAdminCommand>
{
  constructor(private deleter: BackofficeAdminDeleter) {}

  async execute(command: DeleteBackofficeAdminCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeAdminId(item));

    await this.deleter.run(ids);
  }
}
