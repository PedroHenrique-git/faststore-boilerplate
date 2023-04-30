export interface AllContentTypes {
  contentTypes: Array<{
    id: string;
    name: string;
  }>;
  configurationSchemaSets: Array<{
    name: string;
  }>;
  configurations: unknown[];
}

export interface CmsPageByContentType<T = unknown> {
  hasNextPage: boolean;
  totalItems: number;
  data: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    versionId: string;
    versionStatus: string;
    sections: Array<CmsSection<T>>;
    parameters: Record<string, unknown>;
    settings?: {
      seo: {
        title: string;
        description: string;
        slug: string;
        canonical?: string;
      };
    };
  }>;
}

export interface CmsPage<T = unknown> {
  id: string;
  name: string;
  type: string;
  status: string;
  versionId: string;
  versionStatus: string;
  sections: Array<CmsSection<T>>;
}

export interface Filters {
  versionId?: string;
  releaseId?: string;
  filters?: Record<string, string>;
}

export interface CmsSection<T = unknown> {
  id: string;
  name: string;
  data: T;
}
