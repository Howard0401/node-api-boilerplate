// import { Wallet } from '@/wallet/domain/Wallet';
import { Wallet } from "@/wallet/domain/Wallet";
// import { MongoRepository } from '@/_lib/DDD';

type WalletRepository = {
  createNewWallet(w: Wallet.Type): Promise<Wallet.Type>;
  // findById(id: string): Promise<Wallet.Type>;
  // updateNewWallet(opts: Wallet.WalletProps): Promise<Wallet.Type>;
};

export { WalletRepository };
