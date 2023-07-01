import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware, label } from 'next-api-middleware';
import { API_ENDPOINT, ENTITIES_WHITE_LIST } from 'src/sdk/constants';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const masterDataMiddleware: Middleware = async (req, res, next) => {
  const { path } = req.query;

  const pathArr = path as string[];

  const isMasterDataRequest = pathArr.includes('dataentities');

  if (!isMasterDataRequest) {
    return next();
  }

  const entity = pathArr.at(1) ?? '';

  if (!entity) {
    return res.status(400).json({ message: 'Invalid entity' });
  }

  if (!(entity in ENTITIES_WHITE_LIST)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!ENTITIES_WHITE_LIST[entity].includes(req.method ?? '')) {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  res.setHeader('X-VTEX-API-AppKey', process.env.APP_KEY ?? '');
  res.setHeader('X-VTEX-API-AppToken', process.env.APP_TOKEN ?? '');

  await next();
};

const withMiddleware = label({
  masterDataMiddleware,
});

function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    const { path } = req.query;

    const pathArr = path as string[];

    const pathResult = pathArr.join('/');
    const { hostname } = new URL('', `https://${req.headers.host}`);

    proxy.web(
      req,
      res,
      {
        target: API_ENDPOINT,
        changeOrigin: true,
        cookieDomainRewrite: hostname,
      },
      (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      },
    );

    proxy.on('proxyReq', (proxyReq) => {
      const parsedUrl = new URL(proxyReq.path, 'http://localhost');

      for (const name of res.getHeaderNames()) {
        const value = res.getHeader(name);

        if (value) {
          proxyReq.setHeader(name, value);
        }
      }

      proxyReq.path = `/api/${pathResult}?${parsedUrl.searchParams.toString()}`;
    });
  });
}

export default withMiddleware('masterDataMiddleware')(handler);
