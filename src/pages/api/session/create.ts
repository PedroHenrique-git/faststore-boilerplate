import VtexSession from '@controllers/vtex-session';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return VtexSession.create(req, res);
}
