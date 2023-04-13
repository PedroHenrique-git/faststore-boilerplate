import { IStoreSelectedFacet, StoreSort } from '@faststore/api';

export enum CMS_BLOCKS {
  _SHELF = 'ProductShelf',
  _TILES = 'ProductTiles',
  _HERO = 'Hero',
  _INCENTIVES = 'IncentivesHeader',
}

export interface ShelfData {
  first: number;
  after: string;
  sort: StoreSort;
  selectedFacets: IStoreSelectedFacet[];
  title: string;
}

export interface HeroData {
  imageAlt: string;
  imageSrc: string;
  link: string;
  linkText: string;
  subtitle: string;
  title: string;
}

export interface IncentivesData {
  incentives: Array<{ title: string; firstLineText: string; icon: string }>;
}
