import { Injectable } from '@nestjs/common';
import { BackofficeAdmin } from '../../domain/BackofficeAdmin';
import { BackofficeAdminDisplayName } from '../../domain/BackofficeAdminDisplayName';
import { BackofficeAdminEmail } from '../../domain/BackofficeAdminEmail';
import { BackofficeAdminId } from '../../domain/BackofficeAdminId';
import { BackofficeAdminLastname } from '../../domain/BackofficeAdminLastname';
import { BackofficeAdminName } from '../../domain/BackofficeAdminName';
import { BackofficeAdminPhoneNumber } from '../../domain/BackofficeAdminPhoneNumber';
import { BackofficeAdminPhotoURL } from '../../domain/BackofficeAdminPhotoURL';
import { BackofficeAdminRole } from '../../domain/BackofficeAdminRole';
import { BackofficeSQLiteAdminRepository } from '../../infrastructure/persistence/BackofficeSQLiteAdminRepository';

@Injectable()
export class BackofficeAdminCreator {
  constructor(private readonly repository: BackofficeSQLiteAdminRepository) {}

  async run({
    adminId,
    adminEmail,
    adminDisplayName,
    adminPhoneNumber,
    adminPhotoURL,
    adminName,
    adminLastname,
    adminRole,
  }: {
    adminId: BackofficeAdminId;
    adminEmail: BackofficeAdminEmail;
    adminDisplayName: BackofficeAdminDisplayName;
    adminPhoneNumber: BackofficeAdminPhoneNumber;
    adminPhotoURL: BackofficeAdminPhotoURL;
    adminName: BackofficeAdminName;
    adminLastname: BackofficeAdminLastname;
    adminRole: BackofficeAdminRole;
  }): Promise<void> {
    const admin = new BackofficeAdmin(
      adminId,
      adminEmail,
      adminDisplayName,
      adminPhoneNumber,
      adminPhotoURL,
      adminName,
      adminLastname,
      adminRole,
    );

    await this.repository.save(admin);
  }
}
