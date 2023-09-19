import { makeWithInvariants } from '@/_lib/WithInvariants';
import { Wallet as _walletDTO } from "@/_model/wallet";

namespace Wallet {
  type Wallet = _walletDTO;

  const withInvariants = makeWithInvariants<_walletDTO>((self, assert) => {
    if (self.id) {
      assert(self.id > 0);
    }
    assert(self.address.length > 0);
  });

  export type WalletProps = Readonly<{
    address: string;
    state: number;
  }>;

  // create the new data of model
  export const create = withInvariants(
    (props: WalletProps): _walletDTO => ({
      id: 0,
      address: props.address,
      description: "test-" + props.state,
      state: props.state,
      filename: "string",
      views: 0,
      isPublished: true,
      createdAtu: new Date().getUTCMilliseconds(),
      updatedAtu: new Date().getMilliseconds(),
    })
  );

  export type Type = Wallet;
}

export { Wallet };
