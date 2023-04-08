import { config } from '@config/store';
import { fetchApi } from 'src/sdk/helpers/fetchApi';

interface AllContentTypes {
  contentTypes: Array<{
    id: string;
    name: string;
  }>;
  configurationSchemaSets: Array<{
    name: string;
  }>;
  configurations: unknown[];
}

interface CmsPageByContentType<T = unknown> {
  hasNextPage: boolean;
  totalItems: number;
  data: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    versionId: string;
    versionStatus: string;
  }>;
  sections: Array<{
    id: string;
    name: string;
    data: T;
  }>;
  parameters: Record<string, unknown>;
}

interface CmsPage<T = unknown> {
  id: string;
  name: string;
  type: string;
  status: string;
  versionId: string;
  versionStatus: string;
  sections: Array<{
    id: string;
    name: string;
    data: T;
  }>;
}

interface Filters {
  versionId?: string;
  releaseId?: string;
  filters?: Record<string, string>;
}

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
