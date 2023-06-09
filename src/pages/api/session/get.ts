import VtexSession from '@services/vtexSession/VtexSession';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const data = await VtexSession.get(req.headers['cookie'] ?? '');

    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
