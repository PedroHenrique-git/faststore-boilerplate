import VtexId from '@services/vtexid/VtexId';
import { deleteCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { ONE_DAY } from 'src/sdk/constants';
import { setVtexCookie } from './start';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const { data, headers } = await VtexId.logout(req.headers['cookie'] ?? '');

    const { hostname } = new URL('', `https://${req.headers.host}`);
    const cookies = headers['set-cookie'];

    if (cookies) {
      for (const cookie of cookies) {
        setVtexCookie(cookie, req, res);
      }
    }

    deleteCookie('vtex_session', {
      domain: `.${hostname}`,
      expires: new Date(ONE_DAY),
      path: '/',
      secure: true,
      httpOnly: true,
      req,
      res,
    });

    deleteCookie('vtex_segment', {
      domain: `.${hostname}`,
      expires: new Date(ONE_DAY),
      path: '/',
      secure: true,
      httpOnly: true,
      req,
      res,
    });

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
