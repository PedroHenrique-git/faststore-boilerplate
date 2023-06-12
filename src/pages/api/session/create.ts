import VtexSession from '@services/vtex-session/VtexSession';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { ONE_DAY } from 'src/sdk/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const { country, postalCode } = req.body;

    const { hostname } = new URL('', `https://${req.headers.host}`);

    const data = await VtexSession.create(
      { country, postalCode },
      req.headers['cookie'] ?? '',
    );

    if (!req.cookies['vtex_session']) {
      setCookie('vtex_session', data.sessionToken, {
        domain: `.${hostname}`,
        expires: new Date(ONE_DAY),
        path: '/',
        secure: true,
        httpOnly: true,
        req,
        res,
      });
    }

    if (!req.cookies['vtex_segment']) {
      setCookie('vtex_segment', data.segmentToken, {
        domain: `.${hostname}`,
        expires: new Date(ONE_DAY),
        path: '/',
        secure: true,
        httpOnly: true,
        req,
        res,
      });
    }

    return res.status(200).json({ message: 'session created' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
