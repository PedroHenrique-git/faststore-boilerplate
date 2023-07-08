import MasterDataService from '@services/masterdata';
import { Address } from '@services/safedata/types';
import { NextApiResponse } from 'next';
import AppError from 'src/server/exception/app-error';
import { ExtendedApiRequest } from 'src/server/middlewares/attach-user';
import errorHandler from 'src/server/utils/error-handler';

interface Params {
  id?: string;
}

class SafeDataAddress {
  private addressService = new MasterDataService<Address>('AD', true);

  async get(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      const response = await this.addressService.search(
        `_where=userId=${req.user?.id}&_fields=id,postalCode,state,city,neighborhood,street,number,complement,country,userId`,
      );

      return res.status(200).json(response?.data);
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }

  async create(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      const addressBody = {
        ...req.body,
        userId: req.user?.userId,
      };

      await this.addressService.create(addressBody);

      return res.status(200).json(addressBody);
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }

  async updatePartial(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      const { id }: Params = req.query;

      if (!id) {
        throw new AppError('Invalid address id', 400);
      }

      const addressById = await this.addressService.get(id);

      if (!addressById?.data) {
        throw new AppError('Address not found', 404);
      }

      if (addressById.data.userId !== req.user?.id) {
        throw new AppError('Forbidden', 403);
      }

      await this.addressService.updatePartial(id, {
        ...req.body,
      });

      return res.status(200).json({ ...req.body });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }

  async updateEntire(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      const { id }: Params = req.query;

      if (!id) {
        throw new AppError('Invalid address id', 400);
      }

      const addressById = await this.addressService.get(id);

      if (!addressById?.data) {
        throw new AppError('Address not found', 404);
      }

      if (addressById.data.userId !== req.user?.id) {
        throw new AppError('Forbidden', 403);
      }

      await this.addressService.updateEntire(id, {
        ...req.body,
      });

      return res.status(200).json({ ...req.body });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }

  async delete(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      const { id }: Params = req.query;

      if (!id) {
        throw new AppError('Invalid address id', 400);
      }

      const addressById = await this.addressService.get(id);

      if (!addressById?.data) {
        throw new AppError('Address not found', 404);
      }

      if (addressById.data.userId !== req.user?.id) {
        throw new AppError('Forbidden', 403);
      }

      await this.addressService.delete(id);

      return res.status(200).json({ message: `address deleted ${id}` });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }
}

export default new SafeDataAddress();
