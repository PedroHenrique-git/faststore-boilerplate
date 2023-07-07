import { NextApiRequest, NextApiResponse } from 'next';
import { setVtexCookie } from './set-cookie';

export default function setVtexCookies(
  cookies: string[] | undefined,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!cookies) {
    return;
  }

  for (const cookie of cookies) {
    setVtexCookie(cookie, req, res);
  }
}
