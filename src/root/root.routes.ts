import { Router } from 'express';
import { index, healthcheck } from './root.controller';

export const RootRoutes = Router();

// public routes
RootRoutes.get('/', index);
RootRoutes.get('/healthcheck', healthcheck);
