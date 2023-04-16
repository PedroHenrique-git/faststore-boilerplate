import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Footer } from '.';

export default {
  title: 'components/organisms/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

export const StoreFooter: ComponentStory<typeof Footer> = () => {
  return <Footer />;
};
