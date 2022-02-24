import 'dotenv/config';
import '@/index';
import { startApp } from '@/app';
import validateEnv from '@utils/validateEnv';

validateEnv();
startApp();
