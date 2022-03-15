import pick from 'lodash/pick';
import { IUser } from 'common/types';

export const pickUserProfileAttributes = (user: IUser) =>
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

const caseInsensitiveCreds = ['username', 'email'];
export const lowercaseCredentials = <T>(userData: Record<string, string>) => {
  const lowercaseUserData = {};
  Object.keys(userData).forEach(key => {
    lowercaseUserData[key] = caseInsensitiveCreds.includes(key) ? userData[key].toLowerCase() : userData[key];
  });
  return lowercaseUserData as T;
};
