import createRouter from './routes';
import logger from '../../logging';

const log = logger('Plans');

export default function () {
  return createRouter(log);
}
