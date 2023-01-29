import { getExpiration } from './getExpiration';
import moment from 'moment'

export function isLoggedIn() {
  return moment().isBefore(getExpiration());
}
