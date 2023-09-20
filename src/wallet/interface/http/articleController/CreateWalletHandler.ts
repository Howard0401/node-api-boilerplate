// import { CreateArticle } from '@/article/application/useCases/CreateArticle';
import { ApplicationService } from '@/_lib/DDD';
// import { WalletRepository } from '@/wallet/domain/WalletRepository';
import { makeValidator } from '@/_lib/http/validation/Validator';
import { handler } from '@/_lib/http/handler';
import { Request, Response } from 'express';
import Joi from 'types-joi';
import { HttpStatus } from '@/_lib/http/HttpStatus';


type CreateWallet = ApplicationService<CreateWalletDTO, string>;

type Dependencies = {
  createWallet: CreateWallet;
};

type CreateWalletDTO = {
  address: string;
};

const { getBody } = makeValidator({
  body: Joi.object({
    address: Joi.string().required(),
  }).required(),
});

const createWalletHandler = handler(({ createWallet }: Dependencies) => async (req: Request, res: Response) => {
  const { address } = getBody(req);
  
  const walletEntity = await createWallet( { address });

  res.status(HttpStatus.CREATED).json({ wallet: walletEntity });
});

export { createWalletHandler };
