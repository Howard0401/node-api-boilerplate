// import "reflect-metadata"
// import { DataSource } from "typeorm"
// // import { Photo } from "./entity/Photo"

// const PostgresSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "root",
//     password: "admin",
//     database: "test",
//     // entities: [Photo],
//     synchronize: true,
//     logging: false,
// })

// const MySQLSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "admin",
//     database: "test",
//     // entities: [Photo],
//     synchronize: true,
//     logging: false,
// })

// // // to initialize the initial connection with the database, register all entities
// // // and "synchronize" database schema, call "initialize()" method of a newly created database
// // // once in your application bootstrap

// // const makeMongoProvider =
// //   ({ db }: Dependencies): MongoProvider =>
// //   (collections) =>
// //     Object.entries(collections).reduce(
// //       (chain: Promise<any>, [key, promise]) =>
// //         chain.then((acc) => promise(db).then((collection) => ({ ...acc, [key]: collection }))),
// //       Promise.resolve()
// //     );

// export { PostgresSource, MySQLSource }