import moment from 'moment';

export function setLocalStorage(user) {
  const expires = user.data.expiresIn;
  localStorage.setItem('token', user.data.token);
  localStorage.setItem(
    'expires',
    JSON.stringify(moment().add(expires).valueOf())
  );
}
