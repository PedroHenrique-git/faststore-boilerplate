import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT } from 'src/sdk/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const { data } = await axios.get<SessionResponse>(
      `${API_ENDPOINT}/api/sessions?items=*`,
      {
        headers: {
          cookie: req.headers['cookie'],
        },
      },
    );

    return res.status(200).json({ ...data });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
