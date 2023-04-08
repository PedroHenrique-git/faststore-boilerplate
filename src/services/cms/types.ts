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
  }>;
  sections: Array<{
    id: string;
    name: string;
    data: T;
  }>;
  parameters: Record<string, unknown>;
}

export interface CmsPage<T = unknown> {
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

export interface Filters {
  versionId?: string;
  releaseId?: string;
  filters?: Record<string, string>;
}
