import createRouter from './routes';
import logger from '../../logging';

const log = logger('Customers');

export default function () {
  return createRouter(log);
}
