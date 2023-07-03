import MasterDataService from '@services/masterdata';
import { User } from '@services/safedata/types';
import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import { label } from 'next-api-middleware';
import {
  ExtendedApiRequest,
  attachUser,
} from 'src/server/middlewares/attach-user';

const client = new MasterDataService<User>('CL', true);

const middleware = {
  GET: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const response = await client.search(
        `_where=userId=${req.user?.userId}&_fields=id,email,document,firstName,lastName,phone,birthDate,userId`,
      );

      return res.status(200).json({ ...response?.data[0] });
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.Message ?? 'Internal server error';

        return res.status(status).json({
          message: message,
        });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  PUT: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      await client.updateEntire(req.user?.userId ?? '', req.body);

      return res.status(200).json({ ...req.body });
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.Message ?? 'Internal server error';

        return res.status(status).json({
          message: message,
        });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  PATCH: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      await client.updatePartial(req.user?.userId ?? '', req.body);

      return res.status(200).json({ ...req.body });
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.Message ?? 'Internal server error';

        return res.status(status).json({
          message: message,
        });
      }

      return res.status(500).json({ message: 'Internal server error' });
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
