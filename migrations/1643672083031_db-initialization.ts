/* eslint-disable @typescript-eslint/naming-convention */
import { ColumnDefinitions, MigrationBuilder, PgLiteral } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = {
  id: { type: 'uuid', unique: true, notNull: true, default: new PgLiteral('uuid_generate_v4()') },
  created_at: { type: 'timestamptz', notNull: true, default: new PgLiteral('now()') },
  updated_at: { type: 'timestamptz', notNull: true, default: new PgLiteral('now()') },
  intl_text: { type: 'jsonb', notNull: true, default: '{}' },
  json_data: { type: 'jsonb', notNull: true, default: '{}' },
};

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addExtension(['uuid-ossp', 'ltree', 'pgcrypto'], {
    ifNotExists: true,
  });
  pgm.createFunction(
    'set_current_timestamp_updated_at',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
    },
    `
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
    `,
  );

  pgm.createTable('users', {
    id: { type: 'id', primaryKey: true },
    created_at: 'created_at',
    updated_at: 'updated_at',
    username: { type: 'varchar(255)', notNull: true, unique: true, check: 'username = lower(username)' },
    family_name: { type: 'varchar(255)', notNull: true },
    given_name: { type: 'varchar(255)', notNull: true },
    middle_name: 'varchar(255)',
    email: { type: 'varchar(255)', notNull: true, unique: true, check: 'email = lower(email)' },
    email_verified: { type: 'boolean', notNull: true, default: false },
    phone_number: 'varchar(35)',
    phone_number_verified: { type: 'boolean', notNull: true, default: false },
    website: 'text',
    additional_emails: 'json_data',
    oauth_providers: 'json_data',
    additional_info: 'json_data',
    bio: 'intl_text',
    picture_id: 'uuid',
    birthday: 'date',
    encrypted_password: { type: 'varchar(255)', notNull: true },
    is_admin: { type: 'boolean', notNull: true, default: false },
    is_deleted: { type: 'boolean', notNull: true, default: false },
    is_banned: { type: 'boolean', notNull: true, default: false },
    is_restricted: { type: 'boolean', notNull: true, default: false },
    last_login_at: 'timestamptz',
    last_login_ip: 'inet',
    legal_address_id: 'uuid',
    locale: 'varchar(2)',
    notification_settings: 'json_data',
    favorite_count: { type: 'integer', notNull: true, default: 0 },
  });
  pgm.createTrigger('users', 'set_users_updated_at', {
    function: 'set_current_timestamp_updated_at',
    level: 'STATEMENT',
    operation: 'UPDATE',
    when: 'AFTER',
  });

  pgm.createTable('addresses', {
    id: { type: 'id', primaryKey: true },
    created_at: 'created_at',
    updated_at: 'updated_at',
    name: 'varchar(255)',
    address1: 'varchar(255)',
    address2: 'varchar(255)',
    city: { type: 'varchar(255)', notNull: true },
    country: { type: 'varchar(255)', notNull: true },
    country_code: { type: 'varchar(2)', notNull: true },
    state: 'varchar(255)',
    state_code: 'varchar(10)',
    postal_code: 'varchar(10)',
    user_id: 'uuid',
    phone_number: 'varchar(35)',
    status: { type: 'integer', notNull: true, default: 0 },
    validated: { type: 'boolean', notNull: true, default: false },
    latitude: 'double precision',
    longitude: 'double precision',
  });
  pgm.createTrigger('addresses', 'set_addresses_updated_at', {
    function: 'set_current_timestamp_updated_at',
    level: 'STATEMENT',
    operation: 'UPDATE',
    when: 'AFTER',
  });
}
