import { CreateUserDto } from './users.dto';
import { IUser } from 'common/types';
import { pgQuery } from 'common';

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
  return user as IUser;
};

export const updatePassword = async (id: string, password: string) =>
  pgQuery(
    `
    UPDATE users
    SET encrypted_password = crypt($1, gen_salt('bf'))
    WHERE id = $2
  `,
    [password, id],
  );

export const addResetToken = async (id: string, token: string) =>
  pgQuery(
    `
  UPDATE users
  SET reset_password_token = $1, reset_token_expires_at = NOW() + INTERVAL '1 hour'
  WHERE id = $2
  `,
    [token, id],
  );

export const findByEmail = async (id: string) => {
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
  return result.rows[0] as IUser;
};

export const findById = async (id: string) => {
  const result = await pgQuery(
    `
    SELECT * FROM users
    WHERE id = $1
    AND is_deleted = false
  `,
    [id],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0] as IUser;
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
  return result.rows[0] as IUser;
};

export const findByLoginCredentials = async (username: string, password: string) => {
  const result = await pgQuery(
    `
    SELECT id, given_name, middle_name, family_name, email, languages, username FROM users
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
  const user = result.rows[0] as IUser;
  pgQuery(`UPDATE users SET last_login = NOW() WHERE id = $1`, [user.id]);
  return user;
};
