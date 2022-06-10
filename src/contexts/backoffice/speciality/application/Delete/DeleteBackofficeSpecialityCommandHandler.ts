import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityDeleter } from './BackofficeSpecialityDeleter';
import { DeleteBackofficeSpecialityCommand } from './DeleteBackofficeSpecialityCommand';

@CommandHandler(DeleteBackofficeSpecialityCommand)
export class DeleteBackofficeSpecialityCommandHandler
  implements ICommandHandler<DeleteBackofficeSpecialityCommand>
{
  constructor(private deleter: BackofficeSpecialityDeleter) {}

  async execute(command: DeleteBackofficeSpecialityCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficeSpecialityId(item));

    await this.deleter.run(ids);
  }
}
