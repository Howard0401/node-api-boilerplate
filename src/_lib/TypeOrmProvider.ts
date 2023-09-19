import { DataSource } from "typeorm"

interface TypeORMDependencies { 
  typeORM: DataSource;
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type TypeORMInitializer = Record<string, (db: DataSource) => Promise<void>>;

type TypeORMProvider = <Type extends TypeORMInitializer>(
  init: Type
) => Promise<{ [key in keyof Type]: ThenArg<ReturnType<Type[key]>>}>;

type InitializedTypeORM<Type extends TypeORMInitializer> = Promise<
  { [key in keyof Type]: ThenArg<ReturnType<Type[key]>> }
>;

const makeTypeORMProvider =
  ({ typeORM }: TypeORMDependencies): TypeORMProvider =>
    (collections) =>
      Object.entries(collections).reduce(
        (chain: Promise<any>, [key, promise]) =>
          chain.then((acc) => promise(typeORM).then((db) => ({ ...acc, [key]: db }))),
        Promise.resolve()
  );

const withTypeORMProvider =
  <Type extends TypeORMInitializer>(collections: Type) =>
  ({ typeProvider }: { typeProvider: TypeORMProvider }): InitializedTypeORM<Type> =>
  typeProvider(collections);


  export { 
    makeTypeORMProvider, 
    withTypeORMProvider,
  };
  
  export type { TypeORMProvider };
  