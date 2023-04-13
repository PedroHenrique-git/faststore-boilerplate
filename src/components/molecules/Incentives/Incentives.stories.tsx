import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Incentives } from '.';

export default {
  title: 'components/molecules/Incentives',
  component: Incentives,
} as ComponentMeta<typeof Incentives>;

export const StoreIncentives: ComponentStory<typeof Incentives> = () => {
  return (
    <Incentives
      incentives={[
        {
          firstLineText: 'Get Free Shipping',
          icon: 'Truck',
          title: 'Buy online',
        },
        {
          firstLineText: '30 days to return',
          icon: 'Calendar',
          title: 'Free return',
        },
        {
          firstLineText: '$20/$30/$40',
          icon: 'Gift',
          title: 'Gift cards',
        },
        {
          firstLineText: '+40 Stores in Brazil',
          icon: 'Storefront',
          title: 'Physical Stores',
        },
        {
          firstLineText: 'Get Free Shipping',
          icon: 'ShieldCheck',
          title: 'Buy online',
        },
      ]}
    />
  );
};
