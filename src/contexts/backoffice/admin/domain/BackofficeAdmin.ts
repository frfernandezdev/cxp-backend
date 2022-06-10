import { AggregateRoot } from '@nestjs/cqrs';
import { BackofficeAdminDisplayName } from './BackofficeAdminDisplayName';
import { BackofficeAdminEmail } from './BackofficeAdminEmail';
import { BackofficeAdminId } from './BackofficeAdminId';
import { BackofficeAdminLastname } from './BackofficeAdminLastname';
import { BackofficeAdminName } from './BackofficeAdminName';
import { BackofficeAdminPhoneNumber } from './BackofficeAdminPhoneNumber';
import { BackofficeAdminPhotoURL } from './BackofficeAdminPhotoURL';
import { BackofficeAdminRole } from './BackofficeAdminRole';

export class BackofficeAdmin extends AggregateRoot {
  constructor(
    private readonly id: BackofficeAdminId,
    private readonly email: BackofficeAdminEmail,
    private readonly displayName: BackofficeAdminDisplayName,
    private readonly phoneNumber: BackofficeAdminPhoneNumber,
    private readonly photoURL: BackofficeAdminPhotoURL,
    private readonly name: BackofficeAdminName,
    private readonly lastname: BackofficeAdminLastname,
    private readonly role: BackofficeAdminRole,
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
    role: number;
  }): BackofficeAdmin {
    return new BackofficeAdmin(
      new BackofficeAdminId(plainData.id),
      new BackofficeAdminEmail(plainData.email),
      new BackofficeAdminDisplayName(plainData.displayName),
      new BackofficeAdminPhoneNumber(plainData.phoneNumber),
      new BackofficeAdminPhotoURL(plainData.photoURL),
      new BackofficeAdminName(plainData.name),
      new BackofficeAdminLastname(plainData.lastname),
      new BackofficeAdminRole(plainData.role),
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
      role: this.role.value,
    };
  }
}
