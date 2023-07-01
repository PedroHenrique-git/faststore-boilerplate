import axios, { Axios } from 'axios';

class MasterDataService<T = Record<string, unknown>> {
  private http: Axios | null = null;

  constructor(private entity: string) {
    this.entity = entity;

    this.http = axios.create({
      baseURL: `/api/vtex/dataentities/${this.entity}`,
    });
  }

  get(id: string) {
    return this.http?.get(`/documents/${id}`);
  }

  create(body: T) {
    return this.http?.post('/documents', body);
  }

  createPartial(body: T) {
    return this.http?.patch('/documents', body);
  }

  updateEntire(id: string, body: T) {
    return this.http?.put(`/documents/${id}`, body);
  }

  updatePartial(id: string, body: T) {
    return this.http?.patch(`/documents/${id}`, body);
  }

  delete(id: string) {
    return this.http?.patch(`/documents/${id}`);
  }
}

export default MasterDataService;
