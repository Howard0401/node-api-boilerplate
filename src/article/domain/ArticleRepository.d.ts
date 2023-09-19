import { Article } from '@/article/domain/Article';
import { MongoRepository } from '@/_lib/DDD';

type ArticleRepository = MongoRepository<Article.Type> & {
  findById(id: string): Promise<Article.Type>;
};

export { ArticleRepository };
