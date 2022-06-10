import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficePlanId } from '../../domain/BackofficePlanId';
import { BackofficePlanDeleter } from './BackofficePlanDeleter';
import { DeleteBackofficePlanCommand } from './DeleteBackofficePlanCommandHandler';

@CommandHandler(DeleteBackofficePlanCommand)
export class DeleteBackofficePlanCommandHandler
  implements ICommandHandler<DeleteBackofficePlanCommand>
{
  constructor(private deleter: BackofficePlanDeleter) {}

  async execute(command: DeleteBackofficePlanCommand) {
    let ids = [];

    if (Array.isArray(command.id)) {
      ids = [...command.id];
    } else {
      ids = [command.id];
    }

    ids = ids.map((item) => new BackofficePlanId(item));

    await this.deleter.run(ids);
  }
}
