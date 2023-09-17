import { Article } from '@/article/domain/Article';
import { Event } from '@/_lib/events/Event';
import { v4 } from 'uuid-mongodb';

namespace WalletCreatedEvent {
  export const topic = 'Wallet' as const;
  export const eventType = 'WalletCreatedEvent' as const;

  type WalletCreatedEvent = Event<Article.Type, typeof eventType, typeof topic>;

  export const create = (article: Article.Type): WalletCreatedEvent => ({
    eventId: v4().toString(),
    eventType,
    topic,
    payload: article,
  });

  export type Type = WalletCreatedEvent;
}

export { WalletCreatedEvent };
