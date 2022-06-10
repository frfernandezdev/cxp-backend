import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeSpecialityId } from '../../domain/BackofficeSpecialityId';
import { BackofficeSpecialityName } from '../../domain/BackofficeSpecialityName';
import { BackofficeSpecialityUpdater } from './BackofficeSpecialityUpdater';
import { UpdateBackofficeSpecialityCommand } from './UpdateBackofficeSpecialityCommand';

@CommandHandler(UpdateBackofficeSpecialityCommand)
export class UpdateBackofficeSpecialityCommandHandler
  implements ICommandHandler<UpdateBackofficeSpecialityCommand>
{
  constructor(private updater: BackofficeSpecialityUpdater) {}

  async execute(command: UpdateBackofficeSpecialityCommand) {
    const specialityId = new BackofficeSpecialityId(command.id);
    const specialityName = new BackofficeSpecialityName(command.name);

    await this.updater.run({
      specialityId,
      specialityName,
    });
  }
}
