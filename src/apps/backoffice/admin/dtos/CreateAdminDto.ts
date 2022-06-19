import { IsEnum, IsString } from 'class-validator';
import { BackofficeAdminRoles } from 'src/contexts/backoffice/admin/domain/BackofficeAdminRole';

export class CreateAdminDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly displayName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phoneNumber: string;

  @IsString()
  readonly photoURL: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly lastname: string;

  @IsString()
  readonly disabled: boolean;

  @IsEnum(BackofficeAdminRoles)
  readonly role: number;
}
