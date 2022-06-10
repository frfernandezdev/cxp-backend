export class UpdateBackofficeAdminCommand {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
  readonly phoneNumber: string;
  readonly photoURL: string;
  readonly name: string;
  readonly lastname: string;
  readonly role: number;

  constructor({
    id,
    email,
    displayName,
    phoneNumber,
    photoURL,
    name,
    lastname,
    role,
  }: {
    id: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    photoURL: string;
    name: string;
    lastname: string;
    role: number;
  }) {
    this.id = id;
    this.email = email;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
    this.photoURL = photoURL;
    this.name = name;
    this.lastname = lastname;
    this.role = role;
  }
}
