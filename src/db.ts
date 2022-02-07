import { Pool, QueryConfig, QueryResult } from 'pg';

const pool = new Pool();

export const pgQuery = async (text: string | QueryConfig<any[]>, values?: any[]): Promise<QueryResult<any>> => pool.query(text, values);

export const getPoolClient = async () => pool.connect();
