import { pgQuery } from 'db';

import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/user.interface';

export interface ICreatePayload extends CreateUserDto {
  languages: string[];
}

export const create = async ({ username, email, password, givenName, familyName, languages }: ICreatePayload) => {
  const {
    rows: [user],
  } = await pgQuery(
    `
    INSERT INTO users (username, email, encrypted_password, given_name, family_name, languages)
    VALUES ($1, $2, crypt($3, gen_salt('bf')), $4, $5, $6)
    RETURNING id, username, email, given_name, family_name, languages
  `,
    [username, email, password, givenName, familyName, languages],
  );
  return user as User;
};

export const updatePassword = async (id: string, password: string) => {
  const {
    rows: [user],
  } = await pgQuery(
    `
    UPDATE users
    SET encrypted_password = crypt($1, gen_salt('bf'))
    WHERE id = $2
    RETURNING id, username, email, given_name, family_name, languages
  `,
    [password, id],
  );
  return user as User;
};

export const addResetToken = async (id: string, token: string) => {
  const {
    rows: [user],
  } = await pgQuery(
    `
    UPDATE users
    SET reset_password_token = $1, reset_token_expires_at = NOW() + INTERVAL '1 hour'
    WHERE id = $2
    RETURNING id, username, email, given_name, family_name, languages
  `,
    [token, id],
  );
  return user as User;
};

export const findByEmail = async (id: string) => {
  const result = await pgQuery(
    `
    SELECT id, given_name, middle_name, family_name, languages, username FROM users
    WHERE email = $1
    AND is_banned = false
    AND is_deleted = false
  `,
    [id],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0] as User;
};

export const findFullUserByEmail = async (id: string) => {
  const result = await pgQuery(
    `
    SELECT * FROM users
    WHERE email = $1
    AND is_deleted = false
  `,
    [id],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0] as User;
};

export const findById = async (id: string) => {
  const result = await pgQuery(
    `
    SELECT id, given_name, middle_name, family_name, languages, username FROM users
    WHERE id = $1
    AND is_banned = false
    AND is_deleted = false
  `,
    [id],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0] as User;
};

export const findByUsername = async (id: string) => {
  const result = await pgQuery(
    `
    SELECT id, given_name, middle_name, family_name, languages, username FROM users
    WHERE username = $1
    AND is_banned = false
    AND is_deleted = false
  `,
    [id],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0] as User;
};

export const findByLoginCredentials = async (username: string, password: string) => {
  const result = await pgQuery(
    `
    SELECT id, given_name, middle_name, family_name, languages, username FROM users
    WHERE (username = $1 OR email = $1)
    AND is_banned = false
    AND is_deleted = false
    AND encrypted_password = crypt($2, encrypted_password)
  `,
    [username, password],
  );
  if (result.rowCount === 0) {
    return null;
  }
  const user = result.rows[0] as User;
  pgQuery(`UPDATE users SET last_login = NOW() WHERE id = $1`, [user.id]);
  return user;
};
