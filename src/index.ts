import express from 'express';
import logger from './utils/logger';
import { debugFactory, debugInit, DebugNamespace } from './utils/debug';
import serviceHealth from './controllers/service-health.controller';
import { configDotenv } from 'dotenv';
import { create } from 'express-handlebars';
import path from 'path';

debugInit();
configDotenv();

const debug = debugFactory(DebugNamespace.STARTUP);
const app = express();

app.engine(
  'handlebars',
  create({
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
  }).engine
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/views/layouts')))

app.use(logger);

app.get('/', serviceHealth);

app.listen(process.env.PORT ?? 8080, () => {
  debug(`Server started on port ${process.env.PORT ?? 8080}`);
});
