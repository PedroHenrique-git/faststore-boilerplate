import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Logo } from './Logo';

export default {
  title: 'components/atoms/Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const StoreLogo: ComponentStory<typeof Logo> = () => {
  return <Logo />;
};
