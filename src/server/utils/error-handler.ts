import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function errorHandler(
  _: NextApiRequest,
  res: NextApiResponse,
  err: unknown,
) {
  if (err instanceof AxiosError) {
    const status = err.response?.status ?? 500;
    const message = err.response?.data?.Message ?? 'Internal server error';

    return res.status(status).json({
      message: message,
    });
  }

  return res.status(500).json({ message: 'Internal server error' });
}
