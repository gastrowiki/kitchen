import pick from 'lodash/pick';
import { User } from '@interfaces/user.interface';

export const pickUserProfileAttributes = (user: User) =>
  pick(user, [
    'bio',
    'address',
    'birthdate',
    'email',
    'email_verified',
    'family_name',
    'favorite_count',
    'given_name',
    'languages',
    'middle_name',
    'phone_number',
    'phone_number_verified',
    'picture',
    'username',
    'website',
  ]);
