import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BannerText } from '.';

export default {
  title: 'components/molecules/BannerText',
  component: BannerText,
} as ComponentMeta<typeof BannerText>;

export const StoreBannerText: ComponentStory<typeof BannerText> = () => {
  return (
    <BannerText
      actionLabel={'Check it out now!'}
      actionPath={'/office'}
      caption={'Enjoy and get 10% off on your first purchase!!'}
      colorVariant={'light'}
      title={
        "The sun has set out Summer Sale! Save up to 50% off. Don't miss out!"
      }
      variant={'primary'}
    />
  );
};
