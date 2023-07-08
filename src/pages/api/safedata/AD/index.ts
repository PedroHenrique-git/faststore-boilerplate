import safedataAddress from '@controllers/safedata-address';
import { NextApiResponse } from 'next';
import { label } from 'next-api-middleware';
import {
  ExtendedApiRequest,
  attachUser,
} from 'src/server/middlewares/attach-user';

const withMiddleware = label({
  attachUser,
});

async function handler(req: ExtendedApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return safedataAddress.get(req, res);

    case 'POST':
      return safedataAddress.create(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withMiddleware('attachUser')(handler);
