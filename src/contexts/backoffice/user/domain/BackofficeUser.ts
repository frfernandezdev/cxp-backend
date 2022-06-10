import { AggregateRoot } from '@nestjs/cqrs';
import { BackofficeUserCompleteRegister } from './BackofficeUserCompleteRegister';
import { BackofficeUserDisplayName } from './BackofficeUserDisplayName';
import { BackofficeUserEmail } from './BackofficeUserEmail';
import { BackofficeUserId } from './BackofficeUserId';
import { BackofficeUserLastname } from './BackofficeUserLastname';
import { BackofficeUserLocation } from './BackofficeUserLocation';
import { BackofficeUserName } from './BackofficeUserName';
import { BackofficeUserPhoneNumber } from './BackofficeUserPhoneNumber';
import { BackofficeUserPhotoURL } from './BackofficeUserPhotoURL';
import { BackofficeUserSessionTaken } from './BackofficeUserSessionTaken';
import { BackofficeUserTimezone } from './BackofficeUserTimezone';

export class BackofficeUser extends AggregateRoot {
  constructor(
    private readonly id: BackofficeUserId,
    private readonly email: BackofficeUserEmail,
    private readonly displayName: BackofficeUserDisplayName,
    private readonly phoneNumber: BackofficeUserPhoneNumber,
    private readonly photoURL: BackofficeUserPhotoURL,
    private readonly name: BackofficeUserName,
    private readonly lastname: BackofficeUserLastname,
    private readonly completeRegister: BackofficeUserCompleteRegister,
    private readonly location: BackofficeUserLocation,
    private readonly sessionTaken: BackofficeUserSessionTaken,
    private readonly timezone: BackofficeUserTimezone,
  ) {
    super();
  }

  static fromPrimitives(plainData: {
    id: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    photoURL: string;
    name: string;
    lastname: string;
    completeRegister: boolean;
    location: string;
    sessionTaken: number;
    timezone: string;
  }): BackofficeUser {
    return new BackofficeUser(
      new BackofficeUserId(plainData.id),
      new BackofficeUserEmail(plainData.email),
      new BackofficeUserDisplayName(plainData.displayName),
      new BackofficeUserPhoneNumber(plainData.phoneNumber),
      new BackofficeUserPhotoURL(plainData.photoURL),
      new BackofficeUserName(plainData.name),
      new BackofficeUserLastname(plainData.lastname),
      new BackofficeUserCompleteRegister(plainData.completeRegister),
      new BackofficeUserLocation(plainData.location),
      new BackofficeUserSessionTaken(plainData.sessionTaken),
      new BackofficeUserTimezone(plainData.timezone),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      email: this.email.value,
      displayName: this.displayName.value,
      phoneNumber: this.phoneNumber.value,
      photoURL: this.photoURL.value,
      name: this.name.value,
      lastname: this.lastname.value,
      completeRegister: this.completeRegister.value,
      location: this.location.value,
      sessionTaken: this.sessionTaken.value,
      timezone: this.timezone.value,
    };
  }
}
