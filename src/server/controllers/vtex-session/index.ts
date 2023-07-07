import axios from 'axios';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT, ONE_DAY } from 'src/sdk/constants';
import errorHandler from 'src/server/utils/error-handler';

interface CreateSessionDTO {
  country: string;
  postalCode: string;
}

class VtexSession {
  private http = axios.create({
    baseURL: API_ENDPOINT,
  });

  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
      }

      const { country, postalCode }: CreateSessionDTO = req.body;

      const { hostname } = new URL('', `https://${req.headers.host}`);

      const { data } = await this.http.post<SessionResponse>(
        `/api/sessions`,
        {
          public: {
            country: { value: country },
            postalCode: { value: postalCode },
          },
        },
        {
          headers: {
            cookie: req.headers['cookie'],
          },
        },
      );

      if (!req.cookies['vtex_session']) {
        setCookie('vtex_session', data.sessionToken, {
          domain: `.${hostname}`,
          expires: new Date(ONE_DAY),
          path: '/',
          secure: true,
          httpOnly: true,
          req,
          res,
        });
      }

      if (!req.cookies['vtex_segment']) {
        setCookie('vtex_segment', data.segmentToken, {
          domain: `.${hostname}`,
          expires: new Date(ONE_DAY),
          path: '/',
          secure: true,
          httpOnly: true,
          req,
          res,
        });
      }

      return res.status(200).json({ message: 'session created' });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }

  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ message: 'method not allowed' });
      }

      const { data } = await this.http.get<{
        id: string;
        namespaces: Record<string, Record<string, { value: string }>>;
      }>(`/api/sessions?items=*`, {
        headers: {
          cookie: req.headers['cookie'],
        },
      });

      return res.status(200).json({ ...data });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }
}

export default new VtexSession();
