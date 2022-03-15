import 'dotenv/config';
import 'index';
import { startApp } from 'app';
import validateEnv from 'common/utils/validateEnv';

validateEnv();
startApp();
