import { makeModule } from '@/context';
import { makeMongoProvider, MongoProvider } from '@/_lib/MongoProvider';
import { DataSource } from "typeorm"
import { asValue } from 'awilix';
import { Db, MongoClient } from 'mongodb';

type DatabaseConfig = {
  mongodb: {
    database: string;
    host: string;
    username: string;
    password: string;
  };
  mysql: {
    database: string;
    host: string;
    username: string;
    password: string;
    port: number;
  };
  redis: {
    host: string;
    port: number;
  };
};

const mysql = makeModule('type-orm-mysql', async ({ container: { register }, config: { mysql } }) => {
  // const client = new MongoClient(mysql.host, {
  //   auth: { username: mysql.username, password: mysql.password },
  // });

  const mysqlSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    // entities: [Photo],
    synchronize: true,
    logging: false,
  })
  // try {
  const mysqlDB = await mysqlSource.initialize();
  // } catch (error) {
    // console.error(error);
  // }

  // const db = client.db(mysql.database);

  // const mongoProvider = makeMongoProvider({ db });

  register({
    // mysql: asValue(mysqlDB),
    // mongoProvider: asValue(mongoProvider),
  });

  return async () => {
    await mysqlDB.close();
  };
});

const mongoDB = makeModule('mongo-db', async ({ container: { register }, config: { mongodb } }) => {
  const client = new MongoClient(mongodb.host, {
    auth: { username: mongodb.username, password: mongodb.password },
  });

  await client.connect();

  const db = client.db(mongodb.database);

  const mongoProvider = makeMongoProvider({ db });

  register({
    mongo: asValue(db),
    mongoProvider: asValue(mongoProvider),
  });

  return async () => {
    await client.close();
  };
});


type DatabaseRegistry = {
  mongo: Db;
  // mysql: DataSource;
  mongoProvider: MongoProvider;
};

export { mongoDB, mysql };
export type { DatabaseRegistry, DatabaseConfig };
