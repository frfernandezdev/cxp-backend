export class CreateBackofficeSpecialityCommand {
  readonly id: string;
  readonly name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }
}
