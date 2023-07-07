import { config } from '@config/store';
import axios from 'axios';
import { deleteCookie, setCookie } from 'cookies-next';
import FormData from 'form-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT, ONE_DAY } from 'src/sdk/constants';
import errorHandler from 'src/server/utils/error-handler';
import { setVtexCookie } from 'src/server/utils/set-cookie';

interface SendAccessKeyDTO {
  email?: string;
  authenticationToken?: string;
}

interface ValidateAccessKeyDTO {
  code?: string;
  email?: string;
  authenticationToken?: string;
}

class VtexId {
  private http = axios.create({
    baseURL: API_ENDPOINT,
  });

  async start(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ message: 'method not allowed' });
      }

      const { data, headers } = await this.http.get<LoginStart>(
        `/api/vtexid/pub/authentication/start?scope=${config.base.api.storeId}&locale=${config.base.session.locale}`,
      );

      const cookie = headers['set-cookie']?.[0];

      if (cookie) {
        setVtexCookie(cookie, req, res);
      }

      return res.status(200).json({ ...data });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }

  async logout(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') {
        return res.status(405).json({ message: 'method not allowed' });
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

      if (cookies) {
        for (const cookie of cookies) {
          setVtexCookie(cookie, req, res);
        }
      }

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
        return res.status(405).json({ message: 'method not allowed' });
      }

      const { authenticationToken, email }: SendAccessKeyDTO = req.body;

      const form = new FormData();

      form.append('email', email);
      form.append('authenticationToken', authenticationToken);

      const { data } = await this.http.post(
        `${API_ENDPOINT}/api/vtexid/pub/authentication/accesskey/send`,
        form,
        {
          headers: form.getHeaders(),
        },
      );

      return res.status(200).json({ ...data });
    } catch (error) {
      return errorHandler(req, res, error);
    }
  }

  async validateAccessKey(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
      }

      const { code, email, authenticationToken }: ValidateAccessKeyDTO =
        req.body;

      const { hostname } = new URL('', `https://${req.headers.host}`);

      const encoded = new URLSearchParams();

      encoded.set('accessKey', code ?? '');
      encoded.set('email', email ?? '');
      encoded.set('authenticationToken', authenticationToken ?? '');

      const { data } = await this.http.post<AuthResponse>(
        `${API_ENDPOINT}/api/vtexid/pub/authentication/accesskey/validate`,
        encoded,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            cookie: req.headers['cookie'],
          },
        },
      );

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
