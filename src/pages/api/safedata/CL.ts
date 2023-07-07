import MasterDataService from '@services/masterdata';
import { User } from '@services/safedata/types';
import { NextApiResponse } from 'next';
import { label } from 'next-api-middleware';
import {
  ExtendedApiRequest,
  attachUser,
} from 'src/server/middlewares/attach-user';
import errorHandler from 'src/server/utils/error-handler';

const client = new MasterDataService<User>('CL', true);

const middleware = {
  GET: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const response = await client.search(
        `_where=userId=${req.user?.userId}&_fields=id,email,document,firstName,lastName,phone,birthDate,userId`,
      );

      return res.status(200).json({ ...response?.data[0] });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  },
  PUT: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      await client.updateEntire(req.user?.userId ?? '', req.body);

      return res.status(200).json({ ...req.body });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  },
  PATCH: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      await client.updatePartial(req.user?.userId ?? '', req.body);

      return res.status(200).json({ ...req.body });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  },
};

const withMiddleware = label({
  attachUser,
});

async function handler(req: ExtendedApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return middleware.GET(req, res);

    case 'PATCH':
      return middleware.PATCH(req, res);

    case 'PUT':
      return middleware.PUT(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withMiddleware('attachUser')(handler);
