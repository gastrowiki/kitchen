import { ActiveLanguages, TranslatedString } from './language.types';
import { IAddress } from './address.types';
import { Request } from 'express';

export interface IAdditionalInfo {
  flexibleFutureStorage?: string;
}

export interface INotificationPreferences {
  email?: boolean;
  push?: boolean;
  sms?: boolean;
}

export interface IOAuthProviders {
  facebook?: string;
  google?: string;
  twitter?: string;
  otp?: string;
}

export interface IUserPermissions {
  admin?: boolean;
}

export interface IUser {
  id: string;
  created_at: Date;
  updated_at: Date;
  additional_info: IAdditionalInfo;
  bio: TranslatedString;
  address?: IAddress;
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
  notification_preferences: INotificationPreferences;
  oauth_providers: IOAuthProviders;
  permissions: IUserPermissions;
  phone_number?: string;
  phone_number_verified: boolean;
  picture?: string;
  username: string;
  website?: string;
  reset_password_token?: string;
  reset_token_expires_at?: Date;
}

export interface IDataStoredInToken {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  email: string;
  family_name: string;
  favorite_count?: number;
  given_name: string;
  languages: string[];
  middle_name?: string;
  picture?: string;
  username: string;
}

export interface IRequestWithUser extends Request {
  user: IUser;
}
