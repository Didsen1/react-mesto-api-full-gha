const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const MODE_PRODUCTION = 'production';
const DEV_KEY = 'dev-secret-key';

const DEFAULT_PORT = 3000;
const DEFAULT_DATABASE = 'mongodb://127.0.0.1:27017/mestodb';

const ALLOWED_CORS = [
  'http://didsen1.students.nomoredomainsrocks.ru',
  'https://didsen1.students.nomoredomainsrocks.ru',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://84.201.159.80',
  'https://84.201.159.80',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  URL_REGEX,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  DEV_KEY,
  MODE_PRODUCTION,
  DEFAULT_PORT,
  DEFAULT_DATABASE,
};
