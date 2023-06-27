import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT } from 'src/sdk/constants';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const { path, ...queries } = req.query;

    const isPvtRoute = (path as string[]).includes('pvt');
    const pathResult = (path as string[]).join('/');
    const queryResult = new URLSearchParams(queries as Record<string, string>);

    proxy.web(
      req,
      res,
      {
        target: `${API_ENDPOINT}/api/${pathResult}?${queryResult.toString()}`,
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          ...(isPvtRoute
            ? {
                'X-VTEX-API-AppKey': process.env.APP_KEY ?? '',
                'X-VTEX-API-AppToken': process.env.APP_TOKEN ?? '',
              }
            : {}),
        },
      },
      (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      },
    );
  });
};
