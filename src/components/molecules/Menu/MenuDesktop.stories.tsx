import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MenuDesktop } from '.';

export default {
  title: 'components/molecules/MenuDesktop',
  component: MenuDesktop,
} as ComponentMeta<typeof MenuDesktop>;

export const StoreMenuDesktop: ComponentStory<typeof MenuDesktop> = () => {
  return (
    <MenuDesktop
      menuLinks={[
        { href: '/example-one', text: 'example one' },
        { href: '/example-two', text: 'example two' },
        { href: '/example-three', text: 'example three' },
      ]}
    />
  );
};
