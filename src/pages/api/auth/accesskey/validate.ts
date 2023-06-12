import VtexId from '@services/vtex-id/VtexId';
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
    const { code, email, authenticationToken } = req.body;

    const { hostname } = new URL('', `https://${req.headers.host}`);

    const data = await VtexId.validateAccessKey(
      { accessKey: code, email, authenticationToken },
      req.headers['cookie'] ?? '',
    );

    setCookie(data.authCookie.Name, data.authCookie.Value, {
      domain: `.${hostname}`,
      expires: new Date(ONE_DAY),
      path: '/',
      secure: true,
      httpOnly: true,
      req,
      res,
    });

    setCookie(data.accountAuthCookie.Name, data.accountAuthCookie.Value, {
      domain: `.${hostname}`,
      expires: new Date(ONE_DAY),
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
