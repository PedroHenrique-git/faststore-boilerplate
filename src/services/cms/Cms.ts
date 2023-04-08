import { config } from '@config/store';
import { fetchApi } from 'src/sdk/helpers/fetchApi';
import {
  AllContentTypes,
  CmsPage,
  CmsPageByContentType,
  Filters,
} from './types';

class Cms {
  private endpoint = `https://${config.base.api.storeId}.myvtex.com/_v/cms/api/faststore`;

  async getAllContentTypes() {
    return fetchApi<AllContentTypes>(this.endpoint);
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

    return fetchApi<CmsPageByContentType<T>>(
      `${this.endpoint}/${contentType}?${queryParams.toString()}`,
    );
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

    return fetchApi<CmsPage<T>>(
      `${this.endpoint}/${contentType}/${documentId}?${queryParams.toString()}`,
    );
  }
}

export default new Cms();
