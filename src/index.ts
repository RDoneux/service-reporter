import express from 'express';
import logger from './utils/logger';
import { debugFactory, debugInit, DebugNamespace } from './utils/debug';
import serviceHealth from './controllers/service-health.controller';
import { configDotenv } from 'dotenv';

debugInit();
configDotenv();

const debug = debugFactory(DebugNamespace.STARTUP);
const app = express();

app.use(logger);

app.get('/', serviceHealth);

app.listen(process.env.PORT ?? 8080, () => {
    debug(`Server started on port ${process.env.PORT ?? 8080}`);
})