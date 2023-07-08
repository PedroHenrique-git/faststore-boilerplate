import MasterDataService from '@services/masterdata';
import { User } from '@services/safedata/types';
import { NextApiResponse } from 'next';
import { ExtendedApiRequest } from 'src/server/middlewares/attach-user';
import errorHandler from 'src/server/utils/error-handler';

class SafeDataClient {
  private clientService = new MasterDataService<User>('CL', true);

  async get(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      const response = await this.clientService.search(
        `_where=userId=${req.user?.userId}&_fields=id,email,document,firstName,lastName,phone,birthDate,userId`,
      );

      return res.status(200).json({ ...response?.data[0] });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }

  async updateEntire(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      await this.clientService.updateEntire(req.user?.userId ?? '', req.body);

      return res.status(200).json({ ...req.body });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }

  async updatePartial(req: ExtendedApiRequest, res: NextApiResponse) {
    try {
      await this.clientService.updatePartial(req.user?.userId ?? '', req.body);

      return res.status(200).json({ ...req.body });
    } catch (err) {
      return errorHandler(req, res, err);
    }
  }
}

export default new SafeDataClient();
