import { User } from '@interfaces/user.interface';
import { CreateUserDto } from '@dtos/users.dto';
import { pgQuery } from 'db';

export const create = async ({ email, password, givenName, familyName }: CreateUserDto): Promise<User> => {
  const {
    rows: [user],
  } = await pgQuery(
    `
    INSERT INTO users (email, password, given_name, family_name)
    VALUES ($1, crypt($2, gen_salt('bf')), $3, $4)
    RETURNING *
  `,
    [email, password, givenName, familyName],
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
