import { Address } from './address.interface';

export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  middle_name?: string;
  username: string;
  picture?: string;
  website?: string;
  birthdate?: Date;
  locale: string;
  phone_number?: string;
  phone_number_verified: boolean;
  address: Address;
}
