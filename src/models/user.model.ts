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
    RETURNING *
  `,
    [username, email, password, givenName, familyName, languages],
  );
  return user as User;
};

export const findByEmail = async (email: string) => {
  const rows = await pgQuery('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};

export const findById = async (id: string) => {
  const rows = await pgQuery('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

export const findByLoginCredentials = async (username: string, password: string) => {
  const result = await pgQuery(
    `
    SELECT id, given_name, middle_name, family_name, languages, username FROM users
    WHERE (username = $1 OR email = $1)
    AND encrypted_password = crypt($2, encrypted_password)
  `,
    [username, password],
  );
  if (result.rowCount === 0) {
    return null;
  }
  const user = result.rows[0] as User;
  await pgQuery(`UPDATE users SET last_login = NOW() WHERE id = $1`, [user.id]);
  return user;
};
