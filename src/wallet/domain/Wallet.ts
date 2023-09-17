import { AggregateRoot } from '@/_lib/DDD';
import { makeWithInvariants } from '@/_lib/WithInvariants';
import { WalletId } from '@/_sharedKernel/domain/WalletId';

namespace Wallet {
  type Wallet = AggregateRoot<WalletId> &
    Readonly<{
      email: string;
      title: string;
      content: string;
      state: 'DRAFT' | 'PUBLISHED' | 'DELETED';
      publishedAt: Date | null;
      createdAt: Date;
      updatedAt: Date;
      version: number;
    }>;

  // type PublishedArticle = Omit<Wallet, 'publishedAt' | 'state'> & Readonly<{ state: 'PUBLISHED'; publishedAt: Date}>;

  const withInvariants = makeWithInvariants<Wallet>((self, assert) => {
    assert(self.email?.length > 0);
    assert(self.content?.length > 0);
  });

  type WalletProps = Readonly<{
    id: WalletId;
    title: string;
    content: string;
    email: string;
  }>;

  export const create = withInvariants(
    (props: WalletProps): Wallet => ({
      id: props.id,
      email: props.email,
      title: props.title,
      content: props.content,
      state: 'DRAFT',
      publishedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0,
    })
  );

  // export const publish = withInvariants(
  //   (self: Wallet): PublishedArticle => ({
  //     ...self,
  //     state: 'PUBLISHED',
  //     publishedAt: new Date(),
  //   })
  // );

  // export const markAsDeleted = withInvariants(
  //   (self: Wallet): Wallet => ({
  //     ...self,
  //     state: 'DELETED',
  //   })
  // );

  // export const changeTitle = withInvariants(
  //   (self: Wallet, title: string): Wallet => ({
  //     ...self,
  //     title,
  //   })
  // );

  // export const isPublished = (self: Wallet): self is PublishedArticle => self.state === 'PUBLISHED';

  export type Type = Wallet;
}

export { Wallet };
