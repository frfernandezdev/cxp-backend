import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeAdminDisplayName } from '../../domain/BackofficeAdminDisplayName';
import { BackofficeAdminEmail } from '../../domain/BackofficeAdminEmail';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';
import { BackofficeAdminLastname } from '../../domain/BackofficeAdminLastname';
import { BackofficeAdminName } from '../../domain/BackofficeAdminName';
import { BackofficeAdminPhoneNumber } from '../../domain/BackofficeAdminPhoneNumber';
import { BackofficeAdminPhotoURL } from '../../domain/BackofficeAdminPhotoURL';
import { BackofficeAdminRole } from '../../domain/BackofficeAdminRole';
import { BackofficeAdminUpdater } from './BackofficeAdminUpdater';
import { UpdateBackofficeAdminCommand } from './UpdateBackofficeAdminCommand';

@CommandHandler(UpdateBackofficeAdminCommand)
export class UpdateBackofficeAdminCommandHandler
  implements ICommandHandler<UpdateBackofficeAdminCommand>
{
  constructor(private updater: BackofficeAdminUpdater) {}

  async execute(command: UpdateBackofficeAdminCommand) {
    const adminId = new BackofficeAdminId(command.id);
    const adminEmail = new BackofficeAdminEmail(command.email);
    const adminDisplayName = new BackofficeAdminDisplayName(
      command.displayName,
    );
    const adminPhoneNumber = new BackofficeAdminPhoneNumber(
      command.phoneNumber,
    );
    const adminPhotoURL = new BackofficeAdminPhotoURL(command.photoURL);
    const adminName = new BackofficeAdminName(command.name);
    const adminLastname = new BackofficeAdminLastname(command.lastname);
    const adminRole = new BackofficeAdminRole(command.role);

    await this.updater.run({
      adminId,
      adminEmail,
      adminDisplayName,
      adminPhoneNumber,
      adminPhotoURL,
      adminName,
      adminLastname,
      adminRole,
    });
  }
}
