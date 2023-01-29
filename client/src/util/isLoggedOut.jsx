import { isLoggedIn } from './isLoggedIn';

export function isLoggedOut() {
  return !isLoggedIn();
}
