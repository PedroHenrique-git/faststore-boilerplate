import MasterDataService from '@services/masterdata';
import { Address } from '@services/safedata/types';
import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import { label } from 'next-api-middleware';
import {
  ExtendedApiRequest,
  attachUser,
} from 'src/server/middlewares/attach-user';

interface Params {
  id?: string;
}

const address = new MasterDataService<Address>('AD', true);

const middleware = {
  PATCH: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const { id }: Params = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Invalid address id' });
      }

      const addressById = await address.get(id);

      if (!addressById?.data) {
        return res.status(404).json({ message: 'address not found' });
      }

      if (addressById.data.userId !== req.user?.id) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      await address.updatePartial(id, {
        ...req.body,
      });

      return res.status(200).json({ ...req.body });
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.Message ?? 'Internal server error';

        return res.status(status).json({
          message,
        });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  PUT: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const { id }: Params = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Invalid address id' });
      }

      const addressById = await address.get(id);

      if (!addressById?.data) {
        return res.status(404).json({ message: 'address not found' });
      }

      if (addressById.data.userId !== req.user?.id) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      await address.updateEntire(id, {
        ...req.body,
      });

      return res.status(200).json({ ...req.body });
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.Message ?? 'Internal server error';

        return res.status(status).json({
          message,
        });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  DELETE: async (req: ExtendedApiRequest, res: NextApiResponse) => {
    try {
      const { id }: Params = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Invalid address id' });
      }

      const addressById = await address.get(id);

      if (!addressById?.data) {
        return res.status(404).json({ message: 'address not found' });
      }

      if (addressById.data.userId !== req.user?.id) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      await address.delete(id);

      return res.status(200).json({ message: `address deleted ${id}` });
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status ?? 500;
        const message = err.response?.data?.Message ?? 'Internal server error';

        return res.status(status).json({
          message,
        });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

const withMiddleware = label({
  attachUser,
});

function handler(req: ExtendedApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PATCH':
      return middleware.PATCH(req, res);

    case 'PUT':
      return middleware.PUT(req, res);

    case 'DELETE':
      return middleware.DELETE(req, res);

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withMiddleware('attachUser')(handler);
