import { Wallet } from '@/wallet/domain/Wallet';
import { Repository } from '@/_lib/DDD';

type ArticleRepository = Repository<Wallet.Type> & {
  findById(id: string): Promise<Wallet.Type>;
};

export { ArticleRepository };
