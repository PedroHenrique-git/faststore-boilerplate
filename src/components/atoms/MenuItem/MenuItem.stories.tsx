import { List } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MenuItem } from './MenuItem';

export default {
  title: 'components/atoms/MenuItem',
  component: MenuItem,
} as ComponentMeta<typeof MenuItem>;

export const MenuItemStore: ComponentStory<typeof MenuItem> = () => {
  return (
    <List>
      <MenuItem href="/example" text="example" />{' '}
    </List>
  );
};
