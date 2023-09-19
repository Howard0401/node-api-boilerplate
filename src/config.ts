import { MainConfig } from '@/_boot';
import { environment, EnvironmentConfig, envNumber, envString } from '@/_lib/Environment';

type Configuration = MainConfig & EnvironmentConfig;

const config: Configuration = {
  appName: 'node-api-boilerplate',
  cli: process.argv.includes('--cli'),
  environment: environment(),
  repl: {
    port: envNumber('REPL_PORT', 2580),
  },
  http: {
    host: envString('HOST', 'localhost'),
    port: envNumber('PORT', 3000),
  },
  swagger: {
    title: 'Integrate API',
    version: '1.0.0',
    basePath: '/api',
    docEndpoint: '/api-docs',
  },
  mongodb: {
    database: envString('DB_NAME', 'blog'),
    host: envString('DB_HOST', 'mongodb://localhost:27017'),
    username: envString('DB_USER', 'blog'),
    password: envString('DB_PASS', 'blog'),
  },
  mysqlDB: {
    type: 'mysql',
    database: envString('MYSQL_DATABASE', 'test_mysql_db'),
    host: envString('MYSQL_HOST', 'localhost'),
    username: envString('MYSQL_USER', 'test_mysql_user'),
    password: envString('MYSQL_PASSWORD', 'test_mysql_password'),
    port: envNumber('MYSQL_PORT', 3306),
  },
  redis: {
    host: envString('DB_NAME', 'localhost'),
    port: envNumber('DB_PORT', 6379),
  },
};

export { config };
export type { Configuration };
