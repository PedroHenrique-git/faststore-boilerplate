import MasterDataService from '@services/masterdata';
import { Address } from '@services/safedata/types';
import { NextApiResponse } from 'next';
import { label } from 'next-api-middleware';
import {
  ExtendedApiRequest,
  attachUser,
} from 'src/server/middlewares/attach-user';
import errorHandler from 'src/server/utils/error-handler';

const address = new MasterDataService<Address>('AD', true);

const middleware = {
  GET: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const response = await address.search(
        `_where=userId=${req.user?.id}&_fields=id,postalCode,state,city,neighborhood,street,number,complement,country,userId`,
      );

      return res.status(200).json(response?.data);
    } catch (err) {
      return errorHandler(req, res, err);
    }
  },
  POST: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const addressBody = {
        ...req.body,
        userId: req.user?.userId,
      };

      await address.create(addressBody);

      return res.status(200).json(addressBody);
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

    case 'POST':
      return middleware.POST(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withMiddleware('attachUser')(handler);
