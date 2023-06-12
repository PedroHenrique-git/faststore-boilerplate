import VtexId from '@services/vtex-id/VtexId';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const { body } = req;

    const data = await VtexId.sendAccessKey({
      email: body.email,
      authenticationToken: body.authenticationToken,
    });

    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
