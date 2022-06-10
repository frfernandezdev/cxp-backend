import { BackofficeSpeciality } from '../domain/BackofficeSpeciality';

export class BackofficeSpecialityResponse {
  readonly specialities: Array<BackofficeSpeciality>;

  constructor(specialities: Array<BackofficeSpeciality>) {
    this.specialities = specialities;
  }
}
