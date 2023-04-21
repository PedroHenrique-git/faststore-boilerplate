import { ProductDetailsFragment_ProductFragment } from '@generated/graphql';
import { CmsPage } from '@services/cms/types';
import { Pdp as PdpTemplate } from '@templates/Pdp';

interface Props {
  product: ProductDetailsFragment_ProductFragment;
  cmsPdp: CmsPage | null;
}

export const Pdp = ({ product, cmsPdp }: Props) => {
  return <PdpTemplate product={product} cmsPdp={cmsPdp ?? null} />;
};
