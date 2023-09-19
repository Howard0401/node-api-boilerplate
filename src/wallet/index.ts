import { asFunction } from 'awilix';
// import { CreateArticle, makeCreateArticle } from '@/article/application/useCases/CreateArticle';
// import { DeleteArticle, makeDeleteArticle } from '@/article/application/useCases/DeleteArticle';
// import { makePublishArticle, PublishArticle } from '@/article/application/useCases/PublishArticle';
// import { ArticleRepository } from '@/article/domain/ArticleRepository';
// import { ArticleCollection } from '@/article/infrastructure/ArticleCollection';
// import { makeMongoArticleRepository } from '@/article/infrastructure/MongoArticleRepository';
// import { makeArticleController } from '@/article/interface/http/articleController';
// import { FindArticles } from '@/article/application/query/FindArticles';
// import { withMongoProvider } from '@/_lib/MongoProvider';
// import { withTypeORMProvider } from '@/_lib/TypeORMProvider';
// import { toContainerValues } from '@/_lib/di/containerAdapters';
// import { makeMongoFindArticles } from '@/article/infrastructure/MongoFindArticles';
import { makeModule } from '@/context';
// import { makeArticleCreatedEmailListener } from '@/article/interface/email/ArticleCreatedEmailListener';
// import { Wallet } from './domain/Wallet';
import { WalletRepository } from './domain/WalletRepository';
import { makeMysqlWalletRepository } from './infrastructure/WalletRepository';

const walletModule = makeModule('wallet', async ({ container: { register }, initialize }) => {
  // const [collections] = await initialize(
    // withMongoProvider({
    //   articleCollection: initArticleCollection,
    // }),
  // );

  register({
    walletRepository: asFunction(makeMysqlWalletRepository),
    // ...toContainerValues(collections),
    // articleRepository: asFunction(makeMongoArticleRepository),
    // createArticle: asFunction(makeCreateArticle),
    // publishArticle: asFunction(makePublishArticle),
    // deleteArticle: asFunction(makeDeleteArticle),
    // findArticles: asFunction(makeMongoFindArticles),
  });

  await initialize();
});

type WalletRegistry = {
  walletRepository: WalletRepository;
  // articleCollection: ArticleCollection;
  // articleRepository: ArticleRepository;
  // createArticle: CreateArticle;
  // publishArticle: PublishArticle;
  // deleteArticle: DeleteArticle;
  // findArticles: FindArticles;
};

export { walletModule };
export type { WalletRegistry };
