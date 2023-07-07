import VtexId from '@controllers/vtex-id';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return VtexId.logout(req, res);
}
