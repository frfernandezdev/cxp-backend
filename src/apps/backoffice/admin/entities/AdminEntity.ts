import { ApiProperty } from '@nestjs/swagger';
import { BackofficeAdminRoles } from 'src/contexts/backoffice/admin/domain/BackofficeAdminRole';

export class Admin {
  @ApiProperty()
  id: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  photoURL: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  disabled: boolean;

  @ApiProperty({
    enum: BackofficeAdminRoles,
  })
  role: number;
}
