import { Address } from './address.interface';
import { ActiveLanguages, TranslatedString } from './language.interface';

export interface AdditionalInfo {
  flexibleFutureStorage?: string;
}

export interface NotificationPreferences {
  email?: boolean;
  push?: boolean;
  sms?: boolean;
}

export interface OAuthProviders {
  facebook?: string;
  google?: string;
  twitter?: string;
  otp?: string;
}

export interface UserPermissions {
  admin?: boolean;
}

export interface User {
  id: string;
  created_at: Date;
  updated_at: Date;
  additional_info: AdditionalInfo;
  bio: TranslatedString;
  address: Address;
  birthdate?: Date;
  commission_rate: number;
  email: string;
  email_verified: boolean;
  family_name: string;
  favorite_count: number;
  given_name: string;
  is_banned: boolean;
  is_banned_at?: Date;
  is_deleted: boolean;
  is_deleted_at?: Date;
  is_restricted: boolean;
  is_restricted_at?: Date;
  languages: ActiveLanguages[];
  last_login?: Date;
  legal_address_id?: string;
  middle_name?: string;
  notification_preferences: NotificationPreferences;
  oauth_providers: OAuthProviders;
  permissions: UserPermissions;
  phone_number?: string;
  phone_number_verified: boolean;
  picture?: string;
  username: string;
  website?: string;
}
