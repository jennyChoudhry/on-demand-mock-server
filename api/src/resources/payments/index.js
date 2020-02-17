import createRouter from './routes';
import logger from '../../logging';

const log = logger('Payments');

export default function () {
  return createRouter(log);
}
