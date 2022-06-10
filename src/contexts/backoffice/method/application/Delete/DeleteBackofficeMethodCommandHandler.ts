import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBackofficeMethodCommand } from './DeleteBackofficeMethodCommand';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';
import { BackofficeMethodDeleter } from './BackofficeMethodDeleter';

@CommandHandler(DeleteBackofficeMethodCommand)
export class DeleteBackofficeMethodCommandHandler
  implements ICommandHandler<DeleteBackofficeMethodCommand>
{
  constructor(private deleter: BackofficeMethodDeleter) {}

  async execute(command: DeleteBackofficeMethodCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeMethodId(item));

    await this.deleter.run(ids);
  }
}
