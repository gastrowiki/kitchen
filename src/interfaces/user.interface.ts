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
  address?: Address;
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
  reset_password_token?: string;
  reset_token_expires_at?: Date;
}

export type PublicUserProfile = Omit<
  User,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'is_banned'
  | 'is_banned_at'
  | 'is_deleted'
  | 'is_deleted_at'
  | 'is_restricted'
  | 'is_restricted_at'
  | 'last_login'
  | 'legal_address_id'
  | 'oauth_providers'
  | 'permissions'
  | 'reset_password_token'
  | 'reset_token_expires_at'
>;
