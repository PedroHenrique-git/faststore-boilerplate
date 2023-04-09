import { ProductsShelf } from '@organisms/ProductsShelf';
import { CmsSection } from 'src/services/cms/types';
import { CMS_BLOCKS, ShelfProps } from './types';

interface Props {
  sections: Array<CmsSection> | null;
}

export const RenderCmsSections = ({ sections }: Props) => {
  if (!sections?.length) {
    return null;
  }

  return (
    <>
      {sections.map(({ name, data }) => {
        switch (name) {
          case CMS_BLOCKS._SHELF:
          case CMS_BLOCKS._TILES: {
            const { title, ...variables } = data as ShelfProps;

            return <ProductsShelf title={title} variables={variables} />;
          }

          default:
            return <></>;
        }
      })}
    </>
  );
};
