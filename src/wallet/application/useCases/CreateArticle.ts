
import { ApplicationService } from '@/_lib/DDD';
import { eventProvider } from '@/_lib/pubSub/EventEmitterProvider';
import { Wallet } from '@/wallet/domain/Wallet';
import { WalletRepository } from '@/wallet/domain/WalletRepository';

type Dependencies = {
  walletRepository: WalletRepository;
};

type CreateWalletDTO = {
  address: string;
};

type CreateWallet = ApplicationService<CreateWalletDTO, string>;

const makeCreateWallet = eventProvider<Dependencies, CreateWallet>(
  ({  walletRepository }, enqueue) =>
    async (payload: CreateWalletDTO) => {
      const props : Wallet.WalletProps = { 
        address: payload.address,
        state: 0,
      };
      console.log('makeCreateWallet props', props);
      const w : Wallet.Type = Wallet.create(props);
      const createdWallet = await walletRepository.createNewWallet(w);
      console.log('createdWallet', JSON.stringify(createdWallet));
      // enqueue(ArticleCreatedEvent.create(article));
  
      return "success";
    }
);

export { makeCreateWallet };
export type { CreateWallet };
