import FormData from 'form-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT } from 'src/sdk/constants';
import { fetchApi } from 'src/sdk/helpers/fetchApi';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'method not allowed' });
  }

  try {
    const { body } = req;

    const form = new FormData();

    form.append('email', body.email);
    form.append('authenticationToken', body.authenticationToken);

    const result = await fetchApi<Record<string, unknown>>(
      `${API_ENDPOINT}/api/vtexid/pub/authentication/accesskey/send`,
      {
        method: 'POST',
        body: form as unknown as BodyInit,
      },
    );

    return res.status(200).json({ ...result });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
