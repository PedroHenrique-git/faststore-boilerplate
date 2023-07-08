import { config } from '@config/store';
import axios from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';
import FormData from 'form-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT, ONE_DAY } from 'src/sdk/constants';
import AppError from 'src/server/exception/app-error';
import errorHandler from 'src/server/utils/error-handler';
import setVtexCookies from 'src/server/utils/set-vtex-cookies';
import { SendAccessKeyDTO, ValidateAccessKeyDTO } from './vtex-id.dto';

class VtexId {
  private http = axios.create({
    baseURL: API_ENDPOINT,
  });

  async start(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        throw new AppError('Method not allowed', 405);
      }

      const { data, headers: headersFromVtex } =
        await this.http.get<LoginStart>(
          `/api/vtexid/pub/authentication/start?scope=${config.base.api.storeId}&locale=${config.base.session.locale}`,
        );

      const cookiesFromVtex = headersFromVtex['set-cookie'];

      setVtexCookies(cookiesFromVtex, req, res);

      return res.status(200).json({ ...data });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }

  async logout(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        throw new AppError('Method not allowed', 405);
      }

      const { data, headers: headersFromVtex } = await this.http.get(
        `/api/vtexid/pub/authentication/logout?scope=${config.base.api.storeId}`,
        {
          headers: {
            Accept: 'text / plain',
            cookie: req.headers['cookie'],
          },
          withCredentials: true,
        },
      );

      const { hostname } = new URL('', `https://${req.headers.host}`);

      const cookies = headersFromVtex['set-cookie'];

      setVtexCookies(cookies, req, res);

      deleteCookie('vtex_session', {
        domain: `.${hostname}`,
        expires: new Date(ONE_DAY),
        path: '/',
        secure: true,
        httpOnly: true,
        req,
        res,
      });

      deleteCookie('vtex_segment', {
        domain: `.${hostname}`,
        expires: new Date(ONE_DAY),
        path: '/',
        secure: true,
        httpOnly: true,
        req,
        res,
      });

      return res.status(200).json({ message: data });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }

  async sendAccessKey(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'POST') {
        throw new AppError('Method not allowed', 405);
      }

      const { authenticationToken, email }: SendAccessKeyDTO = req.body;

      const form = new FormData();

      form.append('email', email);
      form.append('authenticationToken', authenticationToken);

      const { data, headers: headersFromVtex } = await this.http.post(
        `/api/vtexid/pub/authentication/accesskey/send`,
        form,
        {
          headers: form.getHeaders(),
        },
      );

      const cookiesFromVtex = headersFromVtex['set-cookie'];

      setVtexCookies(cookiesFromVtex, req, res);

      return res.status(200).json({ ...data });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }

  async validateAccessKey(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'POST') {
        throw new AppError('Method not allowed', 405);
      }

      const { code, email, authenticationToken }: ValidateAccessKeyDTO =
        req.body;

      const { hostname } = new URL('', `https://${req.headers.host}`);

      const encoded = new URLSearchParams();

      encoded.set('accessKey', code ?? '');
      encoded.set('email', email ?? '');
      encoded.set('authenticationToken', authenticationToken ?? '');

      const { data, headers: headersFromVtex } =
        await this.http.post<AuthResponse>(
          `/api/vtexid/pub/authentication/accesskey/validate`,
          encoded,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              cookie: req.headers['cookie'],
            },
          },
        );

      const cookiesFromVtex = headersFromVtex['set-cookie'];

      setVtexCookies(cookiesFromVtex, req, res);

      setCookie(data.authCookie.Name, data.authCookie.Value, {
        domain: `.${hostname}`,
        expires: new Date(ONE_DAY),
        path: '/',
        secure: true,
        httpOnly: true,
        req,
        res,
      });

      setCookie(data.accountAuthCookie.Name, data.accountAuthCookie.Value, {
        domain: `.${hostname}`,
        expires: new Date(ONE_DAY),
        path: '/',
        secure: true,
        httpOnly: true,
        req,
        res,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }
}

export default new VtexId();
