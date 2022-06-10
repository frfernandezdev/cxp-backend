export class CreateBackofficeUserCommand {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
  readonly phoneNumber: string;
  readonly photoURL: string;
  readonly name: string;
  readonly lastname: string;
  readonly completeRegister: boolean;
  readonly location: string;
  readonly timezone: string;
  readonly sessionTaken: number;

  constructor({
    id,
    email,
    displayName,
    phoneNumber,
    photoURL,
    name,
    lastname,
    completeRegister,
    location,
    timezone,
    sessionTaken,
  }: {
    id: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    photoURL: string;
    name: string;
    lastname: string;
    completeRegister: boolean;
    location: string;
    timezone: string;
    sessionTaken: number;
  }) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
    this.photoURL = photoURL;
    this.name = name;
    this.lastname = lastname;
    this.completeRegister = completeRegister;
    this.location = location;
    this.timezone = timezone;
    this.sessionTaken = sessionTaken;
  }
}
