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

function handler(req: ExtendedApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PATCH':
      return safedataAddress.updatePartial(req, res);

    case 'PUT':
      return safedataAddress.updateEntire(req, res);

    case 'DELETE':
      return safedataAddress.delete(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withMiddleware('attachUser')(handler);
