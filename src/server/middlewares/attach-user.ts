import MasterDataService from '@services/masterdata';
import { User } from '@services/safedata/types';
import jwtDecode from 'jwt-decode';
import { NextApiRequest } from 'next';
import { Middleware } from 'next-api-middleware';

type PartialUser = Pick<User, 'id' | 'email' | 'userId'>;

export interface ExtendedApiRequest extends NextApiRequest {
  user?: PartialUser;
}

interface TokenData {
  sub: string;
  account: string;
  audience: string;
  sess: string;
  exp: number;
  userId: string;
  iat: number;
  iss: string;
  jti: string;
}

const client = new MasterDataService<PartialUser>('CL', true);

export const attachUser: Middleware = async (
  req: ExtendedApiRequest,
  res,
  next,
) => {
  const authToken =
    req.cookies[`VtexIdclientAutCookie_${process.env.STORE_ID}`];

  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { userId } = jwtDecode<TokenData>(authToken);

  const userResponse = await client.search(
    `_where=userId=${userId}&_fields=id,userId,email`,
  );

  const userFromMasterData = userResponse?.data[0];

  req.user = userFromMasterData;

  await next();
};
