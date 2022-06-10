import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BackofficeUserCompleteRegister } from '../../domain/BackofficeUserCompleteRegister';
import { BackofficeUserDisplayName } from '../../domain/BackofficeUserDisplayName';
import { BackofficeUserEmail } from '../../domain/BackofficeUserEmail';
import { BackofficeUserId } from '../../domain/BackofficeUserId';
import { BackofficeUserLastname } from '../../domain/BackofficeUserLastname';
import { BackofficeUserLocation } from '../../domain/BackofficeUserLocation';
import { BackofficeUserName } from '../../domain/BackofficeUserName';
import { BackofficeUserPhoneNumber } from '../../domain/BackofficeUserPhoneNumber';
import { BackofficeUserPhotoURL } from '../../domain/BackofficeUserPhotoURL';
import { BackofficeUserSessionTaken } from '../../domain/BackofficeUserSessionTaken';
import { BackofficeUserTimezone } from '../../domain/BackofficeUserTimezone';
import { BackofficeUserCreator } from './BackofficeUserCreator';
import { CreateBackofficeUserCommand } from './CreateBackofficeUserCommand';

@CommandHandler(CreateBackofficeUserCommand)
export class CreateBackofficeUserCommandHandler
  implements ICommandHandler<CreateBackofficeUserCommand>
{
  constructor(private creator: BackofficeUserCreator) {}

  async execute(command: CreateBackofficeUserCommand) {
    const userId = new BackofficeUserId(command.id);
    const userEmail = new BackofficeUserEmail(command.email);
    const userDisplayName = new BackofficeUserDisplayName(command.displayName);
    const userPhoneNumber = new BackofficeUserPhoneNumber(command.phoneNumber);
    const userPhotoURL = new BackofficeUserPhotoURL(command.photoURL);
    const userName = new BackofficeUserName(command.name);
    const userLastname = new BackofficeUserLastname(command.lastname);
    const userCompleteRegister = new BackofficeUserCompleteRegister(
      command.completeRegister,
    );
    const userLocation = new BackofficeUserLocation(command.location);
    const userTimezone = new BackofficeUserTimezone(command.timezone);
    const userSessionTaken = new BackofficeUserSessionTaken(
      command.sessionTaken,
    );

    await this.creator.run({
      userId,
      userEmail,
      userDisplayName,
      userPhoneNumber,
      userPhotoURL,
      userName,
      userLastname,
      userCompleteRegister,
      userLocation,
      userTimezone,
      userSessionTaken,
    });
  }
}
