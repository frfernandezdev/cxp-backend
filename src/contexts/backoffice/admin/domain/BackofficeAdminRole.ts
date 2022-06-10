import { EnumValueObject } from 'src/contexts/shared/domain/value-object/EnumValueObject';
import { InvalidArgumentError } from 'src/contexts/shared/domain/value-object/InvalidArgumentError';

export enum BackofficeAdminRoles {
  SuperRoot = 0,
  Root = 1,
  Admin = 2,
  User = 3,
}

export class BackofficeAdminRole extends EnumValueObject<BackofficeAdminRoles> {
  constructor(value: BackofficeAdminRoles) {
    super(value, Object.values(BackofficeAdminRoles) as BackofficeAdminRoles[]);
  }

  static fromValue(value: number): BackofficeAdminRole {
    switch (value) {
      case BackofficeAdminRoles.SuperRoot:
        return new BackofficeAdminRole(BackofficeAdminRoles.SuperRoot);
      case BackofficeAdminRoles.Root:
        return new BackofficeAdminRole(BackofficeAdminRoles.Root);
      case BackofficeAdminRoles.Admin:
        return new BackofficeAdminRole(BackofficeAdminRoles.Admin);
      case BackofficeAdminRoles.User:
        return new BackofficeAdminRole(BackofficeAdminRoles.User);
      default:
        throw new InvalidArgumentError(`The role type ${value} is invalid`);
    }
  }

  public isSuperRoot(): boolean {
    return this.value === BackofficeAdminRoles.SuperRoot;
  }

  public isRoot(): boolean {
    return this.value === BackofficeAdminRoles.Root;
  }

  public isAdmin(): boolean {
    return this.value === BackofficeAdminRoles.Admin;
  }

  public isUser(): boolean {
    return this.value === BackofficeAdminRoles.User;
  }

  protected throwErrorForInvalidValue(value: BackofficeAdminRoles): void {
    throw new InvalidArgumentError(`The role type ${value} is invalid`);
  }
}
