import safedataClient from '@controllers/safedata-client';
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
      return safedataClient.get(req, res);

    case 'PATCH':
      return safedataClient.updatePartial(req, res);

    case 'PUT':
      return safedataClient.updateEntire(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withMiddleware('attachUser')(handler);
