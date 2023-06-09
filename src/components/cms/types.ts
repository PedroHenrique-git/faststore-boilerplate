import { IStoreSelectedFacet, StoreSort } from '@faststore/api';

export enum CMS_BLOCKS {
  _SHELF = 'ProductShelf',
  _TILES = 'ProductTiles',
  _HERO = 'Hero',
  _INCENTIVES = 'IncentivesHeader',
  _BANNERTEXT = 'BannerText',
  _NEWSLETTER = 'Newsletter',
  _CROSSSELLINGSHELF = 'CrossSellingShelf',
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

export interface BannerTextData {
  actionLabel: string;
  actionPath: string;
  caption: string;
  colorVariant: string;
  title: string;
  variant: string;
}

export interface CrossSellingShelfData {
  items: 5;
  kind: string;
  title: string;
}

export interface NewsletterData {
  icon: { alt: string; icon: string };
  title: string;
  description: string;
  emailInputLabel: string;
  nameInputLabel: string;
  subscribeButtonLabel: string;
}
