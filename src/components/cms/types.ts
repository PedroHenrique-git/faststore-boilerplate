import { IStoreSelectedFacet, StoreSort } from '@faststore/api';

export enum CMS_BLOCKS {
  _SHELF = 'ProductShelf',
  _TILES = 'ProductTiles',
}

export interface ShelfProps {
  first: number;
  after: string;
  sort: StoreSort;
  selectedFacets: IStoreSelectedFacet[];
  title: string;
}
