import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useFormatPrice } from 'src/sdk/product/useFormatPrice';
import Price from './Price';

export default {
  title: 'components/atoms/Price',
  component: Price,
} as ComponentMeta<typeof Price>;

const withReactQuery: DecoratorFn = (Story) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};

export const StorePriceWithoutDiscount: ComponentStory<typeof Price> = () => {
  const { formatter } = useFormatPrice();

  return <Price price={100} spotPrice={100} formatter={formatter} />;
};

StorePriceWithoutDiscount.decorators = [withReactQuery];

export const StorePriceWithDiscount: ComponentStory<typeof Price> = () => {
  const { formatter } = useFormatPrice();

  return <Price price={100} spotPrice={50} formatter={formatter} />;
};

StorePriceWithDiscount.decorators = [withReactQuery];
