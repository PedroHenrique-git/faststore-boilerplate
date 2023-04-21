import { ProductDetailsFragment_ProductFragment } from '@generated/graphql';
import { Pdp as PdpTemplate } from '@templates/Pdp';

interface Props {
  product: ProductDetailsFragment_ProductFragment;
}

export const Pdp = ({ product }: Props) => {
  return <PdpTemplate product={product} />;
};
