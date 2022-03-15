import { IAddress } from 'common/types';
import { pgQuery } from 'common';

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
  return result.rows[0] as IAddress;
};
