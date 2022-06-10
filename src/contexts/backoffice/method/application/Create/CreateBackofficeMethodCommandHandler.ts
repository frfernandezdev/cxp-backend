import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeMethodId } from '../../domain/BackofficeMethodId';
import { BackofficeMethodName } from '../../domain/BackofficeMethodName';
import { BackofficeMethodCreator } from './BackofficeMethodCreator';
import { CreateBackofficeMethodCommand } from './CreateBackofficeMethodCommand';

@CommandHandler(CreateBackofficeMethodCommand)
export class CreateBackofficeMethodCommandHandler
  implements ICommandHandler<CreateBackofficeMethodCommand>
{
  constructor(private creator: BackofficeMethodCreator) {}

  async execute(command: CreateBackofficeMethodCommand) {
    const methodId = new BackofficeMethodId(command.id);
    const methodName = new BackofficeMethodName(command.name);

    await this.creator.run({
      methodId,
      methodName,
    });
  }
}
