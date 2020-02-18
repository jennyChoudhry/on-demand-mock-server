import http from 'http';
import express from 'express';
import cors from 'cors';
import expressValidator from 'express-validator';
import { json } from 'body-parser';
import docs from './docs';

import logger from './logging';

import customers from './resources/customers';
import paymentProfiles from './resources/payment-profiles';
import payments from './resources/payments';
import subscriptions from './resources/subscriptions';

import packageJson from '../../package.json';

const port = 4000;
const log = logger();

main().catch(err => log.error({ err }, 'Unable to start API server'));

async function main() {
  log.info(`v${packageJson.version}`);

  log.info('Registering middleware');
  const app = express();
  app.use(cors());
  app.use(json({ limit: '50mb' }));
  app.use(expressValidator());
  app.disable('etag');

  log.info('Registering routes');
  const api = express.Router();

  api.get('/health', (req, res) => {
    res.json({ message: 'Luna is healthy' });
  });

  api.use('/docs', docs());

  api.use('/customers', customers());
  api.use('/payment_profiles', paymentProfiles());
  api.use('/payments', payments());
  api.use('/subscriptions', subscriptions());

  app.use('/v1', api);

  log.info('Starting API server');
  app.server = http.createServer(app);
  app.server.listen(port, () => {
    log.info(`API started on port ${app.server.address().port}`);
  });
}
