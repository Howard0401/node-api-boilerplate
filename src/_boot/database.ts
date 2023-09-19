import "reflect-metadata"
import { makeModule } from '@/context';
import { makeMongoProvider, MongoProvider } from '@/_lib/MongoProvider';
import { makeTypeORMProvider, TypeORMProvider} from '@/_lib/TypeORMProvider';
import { DataSource } from "typeorm"
import { asValue } from 'awilix';
import { Db, MongoClient } from 'mongodb';
import { Wallet } from "@/_model/wallet";

type DatabaseConfig = {
  mongodb: {
    database: string;
    host: string;
    username: string;
    password: string;
  };
  mysqlDB: {
    type: string;
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


const mysql = makeModule('type-orm-mysql', async ({ container: { register }, config: { mysqlDB } }) => {
  const mysqlSource = new DataSource({
    type: "mysql",
    host: mysqlDB.host,
    port: mysqlDB.port,
    username: mysqlDB.username,
    password: mysqlDB.password,
    database: mysqlDB.database,
    entities: [Wallet],
    synchronize: true,
    logging: false,
  })

  try {
    const typeORM = await mysqlSource.initialize();
    const typeORMProvider =  makeTypeORMProvider({ typeORM });

    register({
      mysqlDB: asValue(typeORM),
      mysqlProvider: asValue(typeORMProvider),
    });

    return async () => {
      return Promise.resolve();
    };
  } catch (error) {
    console.error('init db err',error);
    mysqlSource.destroy();
  }
});


type DatabaseRegistry = {
  mongo: Db;
  mysqlDB: DataSource;
  mysqlProvider: TypeORMProvider;
  mongoProvider: MongoProvider;
};

export { mongoDB, mysql };
export type { DatabaseRegistry, DatabaseConfig };
