import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityName } from '../../domain/BackofficeSpecialityName';
import { BackofficeSpecialityCreator } from './BackofficeSpecialityCreator';
import { CreateBackofficeSpecialityCommand } from './CreateBackofficeSpecialityCommand';

@CommandHandler(CreateBackofficeSpecialityCommand)
export class CreateBackofficeSpecialityCommandHandler
  implements ICommandHandler<CreateBackofficeSpecialityCommand>
{
  constructor(private creator: BackofficeSpecialityCreator) {}

  async execute(command: CreateBackofficeSpecialityCommand) {
    const specialityId = new BackofficeSpecialityId(command.id);
    const specialityName = new BackofficeSpecialityName(command.name);

    await this.creator.run({
      specialityId,
      specialityName,
    });
  }
}
