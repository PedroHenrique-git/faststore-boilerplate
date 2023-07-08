import axios from 'axios';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT, ONE_DAY } from 'src/sdk/constants';
import AppError from 'src/server/exception/app-error';
import errorHandler from 'src/server/utils/error-handler';
import setVtexCookies from 'src/server/utils/set-vtex-cookies';
import { CreateSessionDTO } from './vtex-session.dto';

class VtexSession {
  private http = axios.create({
    baseURL: API_ENDPOINT,
  });

  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'POST') {
        throw new AppError('Method not allowed', 405);
      }

      const { country, postalCode }: CreateSessionDTO = req.body;

      const { hostname } = new URL('', `https://${req.headers.host}`);

      const { data, headers: headersFromVtex } =
        await this.http.post<SessionResponse>(
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

      const cookiesFromVtex = headersFromVtex['set-cookie'];

      setVtexCookies(cookiesFromVtex, req, res);

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
        throw new AppError('Method not allowed', 405);
      }

      const { data, headers: headersFromVtex } = await this.http.get<{
        id: string;
        namespaces: Record<string, Record<string, { value: string }>>;
      }>(`/api/sessions?items=*`, {
        headers: {
          cookie: req.headers['cookie'],
        },
      });

      const cookiesFromVtex = headersFromVtex['set-cookie'];

      setVtexCookies(cookiesFromVtex, req, res);

      return res.status(200).json({ ...data });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }
}

export default new VtexSession();
