import axios, { Axios } from 'axios';
import { API_ENDPOINT } from 'src/sdk/constants';

class MasterDataService<T = Record<string, unknown>> {
  private http: Axios | null = null;

  constructor(private entity: string, isServer = false) {
    this.entity = entity;

    this.http = axios.create({
      baseURL: isServer
        ? `${API_ENDPOINT}/api/dataentities/${this.entity}`
        : `/api/vtex/dataentities/${this.entity}`,
      headers: {
        ...(isServer
          ? {
              'X-VTEX-API-AppKey': process.env.APP_KEY ?? '',
              'X-VTEX-API-AppToken': process.env.APP_TOKEN ?? '',
            }
          : {}),
      },
    });
  }

  get(id: string) {
    return this.http?.get<T>(`/documents/${id}`);
  }

  search(filters: string) {
    return this.http?.get<T[]>(`/search?${filters}`);
  }

  create(body: T) {
    return this.http?.post<T>('/documents', body);
  }

  createPartial(body: Partial<T>) {
    return this.http?.patch<Partial<T>>('/documents', body);
  }

  updateEntire(id: string, body: T) {
    return this.http?.put<T>(`/documents/${id}`, body);
  }

  updatePartial(id: string, body: Partial<T>) {
    return this.http?.patch<Partial<T>>(`/documents/${id}`, body);
  }

  delete(id: string) {
    return this.http?.delete<{ Id: string; Href: string }>(`/documents/${id}`);
  }
}

export default MasterDataService;
