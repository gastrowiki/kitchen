import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@interfaces/db.interface';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';

const { host, user, password, database, pool, port }: dbConfig = config.get('dbConfig');
console.log({ host, user, password, database, pool, port });
let sequelize: Sequelize.Sequelize;
try {
  sequelize = new Sequelize.Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    timezone: '+09:00',
    pool: {
      min: pool.min,
      max: pool.max,
    },
    logQueryParameters: process.env.NODE_ENV === 'development',
    logging: (query, time) => {
      logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true,
  });
} catch (error) {
  console.log(error);
  logger.error(error);
}

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
