import { Method } from '../../method/entities/MethodEntity';
import { Plan } from '../../plan/entities/PlanEntity';
import { Speciality } from '../../speciality/entities/SpecialityEntity';
import { UserExpert } from './UserExpertEntity';
import { UserRating } from './UserRatingEntity';

export class User {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  name: string;
  lastname: string;
  disabled: boolean;
  sessionTaken: number;
  completeRegister: boolean;
  timezone: string;
  location: string;
  rating: UserRating;
  expert: UserExpert;
  specialities: Speciality[];
  methods: Method[];
  plans: Plan[];
}
