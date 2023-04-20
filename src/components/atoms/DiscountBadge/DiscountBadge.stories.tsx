import { ComponentMeta, ComponentStory } from '@storybook/react';
import DiscountBadge from '.';

export default {
  title: 'components/atoms/DiscountBadge',
  component: DiscountBadge,
} as ComponentMeta<typeof DiscountBadge>;

export const StoreDiscountBadge: ComponentStory<typeof DiscountBadge> = () => {
  return <DiscountBadge listPrice={420} spotPrice={100} />;
};
