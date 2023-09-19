import { articleModule, ArticleRegistry } from '@/article';
import { commentModule, CommentRegistry } from '@/comment';
// import { WalletRepository } from '@/wallet/domain/WalletRepository';

// eslint-disable-next-line @typescript-eslint/ban-types
type AppModulesConfig = {};

const appModules = [articleModule, commentModule,]//];

type AppModulesRegistry = ArticleRegistry & CommentRegistry// & WalletRepository;

export { appModules };
export type { AppModulesConfig, AppModulesRegistry};// WalletRepository };
