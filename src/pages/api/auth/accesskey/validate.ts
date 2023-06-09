import VtexId from '@services/vtexid/VtexId';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

const oneDay = Date.now() + 1 * 24 * 60 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const { code, email, authenticationToken } = req.body;

    const { hostname } = new URL('', `https://${req.headers.host}`);

    const data = await VtexId.validateAccessKey(
      { accessKey: code, email, authenticationToken },
      req.cookies['cookie'] ?? '',
    );

    setCookie(data.authCookie.Name, data.authCookie.Value, {
      domain: `.${hostname}`,
      expires: new Date(oneDay),
      path: '/',
      secure: true,
      httpOnly: true,
      req,
      res,
    });

    setCookie(data.accountAuthCookie.Name, data.accountAuthCookie.Value, {
      domain: `.${hostname}`,
      expires: new Date(oneDay),
      path: '/',
      secure: true,
      httpOnly: true,
      req,
      res,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
