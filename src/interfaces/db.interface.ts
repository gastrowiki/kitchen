export interface dbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  pool: {
    min: number;
    max: number;
  };
}
