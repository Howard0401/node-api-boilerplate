import { Wallet } from '@/wallet/domain/Wallet';
import { Repository } from '@/_lib/DDD';

type WalletRepository = Repository<Wallet.Type> & {
  findById(id: string): Promise<Wallet.Type>;
  createNewWallet(): Promise<Wallet.Type>;
};

export { WalletRepository };
