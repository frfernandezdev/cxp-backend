import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';
import { BackofficeMethodName } from '../../domain/BackofficeMethodName';
import { BackofficeMethodUpdater } from './BackofficeMethodUpdater';
import { UpdateBackofficeMethodCommand } from './UpdateBackofficeMethodCommand';

@CommandHandler(UpdateBackofficeMethodCommand)
export class UpdateBackofficeMethodCommandHandler
  implements ICommandHandler<UpdateBackofficeMethodCommand>
{
  constructor(private updater: BackofficeMethodUpdater) {}

  async execute(command: UpdateBackofficeMethodCommand) {
    const methodId = new BackofficeMethodId(command.id);
    const methodName = new BackofficeMethodName(command.name);

    await this.updater.run({
      methodId,
      methodName,
    });
  }
}
