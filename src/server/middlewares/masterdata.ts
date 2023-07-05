import { Middleware } from 'next-api-middleware';
import { ENTITIES_CONFIG } from 'src/sdk/constants';

export const masterDataMiddleware: Middleware = async (req, res, next) => {
  const { path } = req.query;

  const authToken =
    req.cookies[`VtexIdclientAutCookie_${process.env.STORE_ID}`];

  const pathArr = path as string[];

  const isMasterDataRequest = pathArr.includes('dataentities');

  if (!isMasterDataRequest) {
    return next();
  }

  const entity = pathArr.at(1) ?? '';

  if (!entity) {
    return res.status(400).json({ message: 'Invalid entity' });
  }

  if (!(entity in ENTITIES_CONFIG)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!ENTITIES_CONFIG[entity].methods.includes(req.method ?? '')) {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (ENTITIES_CONFIG[entity].secret && !authToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.setHeader('X-VTEX-API-AppKey', process.env.APP_KEY ?? '');
  res.setHeader('X-VTEX-API-AppToken', process.env.APP_TOKEN ?? '');

  await next();
};
