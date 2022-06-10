import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeAdminDisplayName } from '../../domain/BackofficeAdminDisplayName';
import { BackofficeAdminEmail } from '../../domain/BackofficeAdminEmail';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';
import { BackofficeAdminLastname } from '../../domain/BackofficeAdminLastname';
import { BackofficeAdminName } from '../../domain/BackofficeAdminName';
import { BackofficeAdminPhoneNumber } from '../../domain/BackofficeAdminPhoneNumber';
import { BackofficeAdminPhotoURL } from '../../domain/BackofficeAdminPhotoURL';
import { BackofficeAdminRole } from '../../domain/BackofficeAdminRole';
import { BackofficeAdminCreator } from './BackofficeAdminCreator';
import { CreateBackofficeAdminCommand } from './CreateBackofficeAdminCommand';

@CommandHandler(CreateBackofficeAdminCommand)
export class CreateBackofficeAdminCommandHandler
  implements ICommandHandler<CreateBackofficeAdminCommand>
{
  constructor(private creator: BackofficeAdminCreator) {}

  async execute(command: CreateBackofficeAdminCommand) {
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

    await this.creator.run({
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
