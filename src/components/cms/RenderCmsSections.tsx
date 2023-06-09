import { ProductDetailsFragment_ProductFragment } from '@generated/graphql';
import { BannerText } from '@molecules/BannerText';
import { HeroCard } from '@molecules/HeroCard';
import { Incentives } from '@molecules/Incentives';
import { Newsletter } from '@organisms/Newsletter';
import { ProductsShelf } from '@organisms/ProductsShelf';
import { Fragment } from 'react';
import { CmsSection } from 'src/services/cms/types';
import {
  BannerTextData,
  CMS_BLOCKS,
  CrossSellingShelfData,
  HeroData,
  IncentivesData,
  NewsletterData,
  ShelfData,
} from './types';

interface Props {
  sections: Array<CmsSection> | null;
  context?: unknown;
}

export const RenderCmsSections = ({ sections, context }: Props) => {
  if (!sections?.length) {
    return null;
  }

  return (
    <>
      {sections.map(({ data, name, id }) => {
        switch (name) {
          case CMS_BLOCKS._SHELF:
          case CMS_BLOCKS._TILES: {
            const { title, ...variables } = data as ShelfData;

            return (
              <ProductsShelf key={id} title={title} variables={variables} />
            );
          }

          case CMS_BLOCKS._HERO: {
            const heroData = data as HeroData;

            return <HeroCard key={id} renderAsSection={true} {...heroData} />;
          }

          case CMS_BLOCKS._INCENTIVES: {
            const { incentives } = data as IncentivesData;

            return <Incentives key={id} incentives={incentives} />;
          }

          case CMS_BLOCKS._BANNERTEXT: {
            const bannerTextData = data as BannerTextData;

            return <BannerText key={id} {...bannerTextData} />;
          }

          case CMS_BLOCKS._NEWSLETTER: {
            const newsletterData = data as NewsletterData;

            return <Newsletter key={id} {...newsletterData} />;
          }

          case CMS_BLOCKS._CROSSSELLINGSHELF: {
            const { title, items, kind } = data as CrossSellingShelfData;
            const product = context as ProductDetailsFragment_ProductFragment;

            return (
              <ProductsShelf
                key={id}
                title={title}
                variables={{
                  first: items,
                  after: '0',
                  sort: 'score_desc',
                  selectedFacets: [
                    { key: kind, value: product.isVariantOf.productGroupID },
                  ],
                }}
              />
            );
          }

          default:
            return <Fragment key={id}></Fragment>;
        }
      })}
    </>
  );
};
