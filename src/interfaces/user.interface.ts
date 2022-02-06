import { Address } from './address.interface';

interface AdditionalInfo {
  flexibleFutureStorage?: string;
}

export interface User {
  id: string;
  created_at: Date;
  updated_at: Date;
  additional_info: AdditionalInfo;
  address: Address;
  birthdate?: Date;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  middle_name?: string;
  name: string;
  password: string;
  phone_number?: string;
  phone_number_verified: boolean;
  picture?: string;
  sub: string;
  username: string;
  website?: string;
}
/*
  additional_info jsonb DEFAULT '{}'::jsonb NOT NULL,
  bio jsonb DEFAULT '{}'::jsonb NOT NULL,
  birthdate date,
  commission_rate real DEFAULT 0.7 NOT NULL,
  email varchar(255) NOT NULL UNIQUE CHECK (email = lower(email)),
  email_verified boolean DEFAULT false NOT NULL,
  encrypted_password varchar(255) NOT NULL,
  family_name varchar(255),
  favorite_count integer DEFAULT 0 NOT NULL,
  given_name varchar(255) NOT NULL,
  is_banned boolean DEFAULT false NOT NULL,
  is_banned_at timestamp with time zone,
  is_deleted boolean DEFAULT false NOT NULL,
  is_deleted_at timestamp with time zone,
  is_restricted boolean DEFAULT false NOT NULL,
  is_restricted_at timestamp with time zone,
  languages character(2)[] NOT NULL,
  last_login timestamp with time zone,
  legal_address_id uuid,
  middle_name varchar(255),
  notification_preferences jsonb DEFAULT '{}'::jsonb NOT NULL,
  oauth_providers jsonb DEFAULT '{}'::jsonb NOT NULL,
  permissions jsonb DEFAULT '{}'::jsonb NOT NULL,
  phone_number varchar(35),
  phone_number_verified boolean DEFAULT false NOT NULL,
  picture_id uuid,
  username varchar(255) UNIQUE NOT NULL CHECK (username = lower(username)),
  verified boolean DEFAULT false NOT NULL,
  website varchar(255),
  */
