import VtexId from '@services/vtexid/VtexId';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookieParser } from 'src/sdk/helpers/cookieParser';

function setVtexCookie(
  cookie: string,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { hostname } = new URL('', `https://${req.headers.host}`);

  const parsedCookie = cookieParser(cookie);

  const cookieName = Object.keys(parsedCookie)[0];
  const cookieValue = parsedCookie[Object.keys(parsedCookie)[0]];

  setCookie(cookieName, cookieValue, {
    domain: `.${hostname}`,
    expires: new Date(parsedCookie.expires),
    path: parsedCookie.path,
    secure: !!parsedCookie.secure,
    httpOnly: !!parsedCookie.httponly,
    req,
    res,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const { data, headers } = await VtexId.start();

    const cookie = headers['set-cookie']?.[0];

    if (cookie) {
      setVtexCookie(cookie, req, res);
    }

    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
