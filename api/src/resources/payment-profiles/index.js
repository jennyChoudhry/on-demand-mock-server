import createRouter from './routes';
import logger from '../../logging';

const log = logger('PaymentProfiles');

export default function () {
  return createRouter(log);
}
