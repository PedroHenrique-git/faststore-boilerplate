import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import AppError from '../exception/app-error';

export default function errorHandler(
  _: NextApiRequest,
  res: NextApiResponse,
  err: unknown,
) {
  if (err instanceof AxiosError) {
    return res.status(err.response?.status ?? 500).json({
      message: err.response?.data?.Message ?? 'Internal server error',
    });
  }

  if (err instanceof AppError) {
    return res.status(err.code ?? 500).json({
      message: err.message ?? 'Internal server error',
    });
  }

  return res.status(500).json({ message: 'Internal server error' });
}
