import { pgQuery } from 'db';

//import { CreateUserDto } from '@dtos/users.dto';
import { Address } from '@interfaces/address.interface';

//export interface ICreatePayload extends CreateUserDto {
//languages: string[];
//}

//export const create = async ({ username, email, password, givenName, familyName, languages }: ICreatePayload) => { };

export const findById = async (id: string) => {
  const result = await pgQuery(
    `
    SELECT * FROM addresses
    WHERE id = $1
  `,
    [id],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0] as Address;
};
