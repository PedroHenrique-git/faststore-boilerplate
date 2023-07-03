import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import { label } from 'next-api-middleware';
import { API_ENDPOINT } from 'src/sdk/constants';
import { masterDataMiddleware } from 'src/server/middlewares/masterdata';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
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
