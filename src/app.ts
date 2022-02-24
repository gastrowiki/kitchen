import '@/index';
import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { RootRoutes } from 'root';
import { UserRoutes } from 'users';
import { errorMiddleware } from 'middlewares';
import { logger, stream } from 'common/utils/logger';

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// middlewares
app.use(morgan(config.get('log.format'), { stream }));
app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/', RootRoutes);
app.use('/api/v1', UserRoutes);

// init after routes for field level validation
app.use(errorMiddleware);

export const getServer = () => app;

export const startApp = () => {
  app.listen(port, () => {
    logger.info(` ▄▄▄▄▄▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   ▄▄▄▄▄▄▄ `);
    logger.info(`█       █      █       █       █   ▄  █ █       █`);
    logger.info(`█   ▄▄▄▄█  ▄   █  ▄▄▄▄▄█▄     ▄█  █ █ █ █   ▄   █`);
    logger.info(`█  █  ▄▄█ █▄█  █ █▄▄▄▄▄  █   █ █   █▄▄█▄█  █ █  █`);
    logger.info(`█  █ █  █      █▄▄▄▄▄  █ █   █ █    ▄▄  █  █▄█  █`);
    logger.info(`█  █▄▄█ █  ▄   █▄▄▄▄▄█ █ █   █ █   █  █ █       █`);
    logger.info(`█▄▄▄▄▄▄▄█▄█ █▄▄█▄▄▄▄▄▄▄█ █▄▄▄█ █▄▄▄█  █▄█▄▄▄▄▄▄▄█`);
    logger.info(` `);
    logger.info(`Listening on ${process.env.FRONTEND_URL}:${process.env.PORT} in ${env} mode`);
  });
};
