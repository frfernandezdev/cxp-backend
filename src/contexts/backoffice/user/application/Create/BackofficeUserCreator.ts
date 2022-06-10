import { Injectable } from '@nestjs/common';
import { BackofficeUser } from '../../domain/BackofficeUser';
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
import { BackofficeSQLiteUserRepository } from '../../infrastructure/persistence/BackofficeSQLiteUserRepository';

@Injectable()
export class BackofficeUserCreator {
  constructor(private readonly repository: BackofficeSQLiteUserRepository) {}

  async run({
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
  }: {
    userId: BackofficeUserId;
    userEmail: BackofficeUserEmail;
    userDisplayName: BackofficeUserDisplayName;
    userPhoneNumber: BackofficeUserPhoneNumber;
    userPhotoURL: BackofficeUserPhotoURL;
    userName: BackofficeUserName;
    userLastname: BackofficeUserLastname;
    userCompleteRegister: BackofficeUserCompleteRegister;
    userLocation: BackofficeUserLocation;
    userTimezone: BackofficeUserTimezone;
    userSessionTaken: BackofficeUserSessionTaken;
  }): Promise<void> {
    const user = new BackofficeUser(
      userId,
      userEmail,
      userDisplayName,
      userPhoneNumber,
      userPhotoURL,
      userName,
      userLastname,
      userCompleteRegister,
      userLocation,
      userSessionTaken,
      userTimezone,
    );

    await this.repository.save(user);
  }
}
