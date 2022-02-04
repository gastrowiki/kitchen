import { getPoolClient } from './';
import { migrate } from 'postgres-migrations';

const runMigrations = async () => {
  const client = await getPoolClient();
  await migrate({ client }, './migrations');
  client.release();
};

export default runMigrations;
