import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MenuMobile } from '.';

export default {
  title: 'components/molecules/MenuMobile',
  component: MenuMobile,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
} as ComponentMeta<typeof MenuMobile>;

export const StoreMenuMobile: ComponentStory<typeof MenuMobile> = () => {
  return (
    <MenuMobile
      menuLinks={[
        { href: '/example-one', text: 'example one' },
        { href: '/example-two', text: 'example two' },
        { href: '/example-three', text: 'example three' },
      ]}
    />
  );
};
