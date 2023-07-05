import { config } from '@config/store';
import axios from 'axios';
import {
  AllContentTypes,
  CmsPage,
  CmsPageByContentType,
  Filters,
} from './types';

class Cms {
  private endpoint = `https://${config.base.api.storeId}.myvtex.com/_v/cms/api/faststore`;

  async getAllContentTypes() {
    const { data } = await axios.get<AllContentTypes>(this.endpoint);

    return data;
  }

  async getAllCmsPagesByContentType<T = unknown>(
    contentType: string,
    params?: Filters,
  ) {
    const queryParams = new URLSearchParams();
    const { filters, releaseId, versionId } = params ?? {};

    if (releaseId) {
      queryParams.set('releaseId', releaseId);
    }

    if (versionId) {
      queryParams.set('versionId', versionId);
    }

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        queryParams.set(`filters[${key}]`, value);
      }
    }

    const { data } = await axios.get<CmsPageByContentType<T>>(
      `${this.endpoint}/${contentType}?${queryParams.toString()}`,
    );

    return data;
  }

  async getCmsPage<T>(
    contentType: string,
    documentId: string,
    params?: Omit<Filters, 'filters'>,
  ) {
    const queryParams = new URLSearchParams();
    const { releaseId, versionId } = params ?? {};

    if (releaseId) {
      queryParams.set('releaseId', releaseId);
    }

    if (versionId) {
      queryParams.set('versionId', versionId);
    }

    const { data } = await axios.get<CmsPage<T>>(
      `${this.endpoint}/${contentType}/${documentId}?${queryParams.toString()}`,
    );

    return data;
  }
}

export default new Cms();
