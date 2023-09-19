import { WalletRepository } from '@/wallet/domain/WalletRepository';
// import { Wallet } from "@/_model/wallet";
import { Wallet } from '@/wallet/domain/Wallet';
// import { ArticleMapper } from '@/article/infrastructure/ArticleMapper';
// import { NotFoundError } from '@/_lib/errors/NotFoundError';
// import { ArticleId } from '@/_sharedKernel/domain/ArticleId';
// import { ArticleIdProvider } from '@/_sharedKernel/infrastructure/ArticleIdProvider';
import { v4 } from 'uuid-mongodb';

type Dependencies = {
  walletDao: WalletRepository;
};

const makeMysqlWalletRepository = ({ walletDao }: Dependencies): WalletRepository => ({
  async createNewWallet(): Promise<Wallet.Type> {
    try {
      const prop :Wallet.WalletProps = {
        address: v4().toString(),
        state: 0,
      }
      const w = Wallet.create(prop);
      const data = await walletDao.createNewWallet(w);
      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
});

export { makeMysqlWalletRepository };
