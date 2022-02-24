import '@/index';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';

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
app.use(errorMiddleware);

// routes
const indexRoutes = new IndexRoute();
app.use('/', indexRoutes.router);
app.use('/api/v1', AuthRoute);

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
    logger.info(`   Listening on port ${port} in ${env} mode`);
  });
};
