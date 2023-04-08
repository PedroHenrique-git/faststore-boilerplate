import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';
import { Price } from './Price';

export default {
  title: 'components/atoms/Price',
  component: Price,
} as ComponentMeta<typeof Price>;

export const StorePriceWithoutDiscount: ComponentStory<typeof Price> = () => {
  const { formatter } = useFormatPrice();

  return <Price price={100} spotPrice={100} formatter={formatter} />;
};

export const StorePriceWithDiscount: ComponentStory<typeof Price> = () => {
  const { formatter } = useFormatPrice();

  return <Price price={100} spotPrice={50} formatter={formatter} />;
};
