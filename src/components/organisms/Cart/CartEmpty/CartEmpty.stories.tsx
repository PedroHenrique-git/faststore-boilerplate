import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CartEmpty } from './CartEmpty';

export default {
  title: 'components/organisms/Cart/CartEmpty',
  component: CartEmpty,
} as ComponentMeta<typeof CartEmpty>;

export const StoreCartEmpty: ComponentStory<typeof CartEmpty> = () => {
  return <CartEmpty />;
};
