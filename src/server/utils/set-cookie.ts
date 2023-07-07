import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookieParser } from 'src/sdk/helpers/cookieParser';

export function setVtexCookie(
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
