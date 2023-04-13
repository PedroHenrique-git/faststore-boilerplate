import { HeroCard } from '@molecules/HeroCard';
import { ProductsShelf } from '@organisms/ProductsShelf';
import { Fragment } from 'react';
import { CmsSection } from 'src/services/cms/types';
import { CMS_BLOCKS, HeroData, ShelfData } from './types';

interface Props {
  sections: Array<CmsSection> | null;
}

export const RenderCmsSections = ({ sections }: Props) => {
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

            return <HeroCard key={id} {...heroData} />;
          }

          default:
            return <Fragment key={id}></Fragment>;
        }
      })}
    </>
  );
};
