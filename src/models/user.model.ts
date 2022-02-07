import { User } from '@interfaces/user.interface';
import { CreateUserDto } from '@dtos/users.dto';
import { pgQuery } from 'db';

export interface ICreatePayload extends CreateUserDto {
  languages: string[];
}

export const create = async ({ username, email, password, givenName, familyName, languages }: ICreatePayload): Promise<User> => {
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
  return user;
};

export const findByEmail = async (email: string) => {
  const rows = await pgQuery('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};

export const findById = async (id: string) => {
  const rows = await pgQuery('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
};

export const findByUserPass = async (username: string, password: string) => {
  const rows = await pgQuery('SELECT * FROM users WHERE email = $1 AND password = crypt($2)', [username, password]);
  console.log(rows);
  return rows[0];
};
