import { config } from '@config/store';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT } from 'src/sdk/constants';

const cookieParser = (cookie: string) => {
  return cookie
    .split(';')
    .map((str) => str.trim())
    .reduce<Record<string, unknown>>((prev, current) => {
      const [key, value] = current.split('=');

      return {
        ...prev,
        ...(key === 'secure' || key === 'httponly' || key === 'httpOnly'
          ? { [key]: true }
          : { [key]: value }),
      };
    }, {});
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const request = await fetch(
      `${API_ENDPOINT}/api/vtexid/pub/authentication/start?scope=${config.base.api.storeId}&locale=${config.base.session.locale}`,
    );

    const { hostname } = new URL('', `https://${req.headers.host}`);

    const cookie = request.headers.get('set-cookie');

    if (cookie) {
      const parsedCookie = cookieParser(cookie);

      const cookieName = Object.keys(parsedCookie)[0];
      const cookieValue = parsedCookie[Object.keys(parsedCookie)[0]];

      setCookie(cookieName, cookieValue, {
        domain: hostname,
        expires: new Date(String(parsedCookie.expires)),
        path: String(parsedCookie.path),
        secure: Boolean(parsedCookie.secure),
        httpOnly: Boolean(parsedCookie.httponly),
        req,
        res,
      });
    }

    const data = await request.json();

    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
