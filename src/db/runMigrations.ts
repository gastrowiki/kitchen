const pg = require('pg');
const { migrate } = require('postgres-migrations')

const runMigrations = async () => {
  const client = new pg.Client();
  await client.connect();
  try {
    await migrate({ client }, './src/db/migrations');
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }
};

runMigrations();
