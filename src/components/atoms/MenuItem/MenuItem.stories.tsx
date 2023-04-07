import { List } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react';
import { MenuItem } from './MenuItem';

export default {
  title: 'components/atoms/MenuItem',
  component: MenuItem,
} as ComponentMeta<typeof MenuItem>;

const withList: DecoratorFn = (Story) => {
  return (
    <List>
      <Story />
    </List>
  );
};

export const MenuItemStore: ComponentStory<typeof MenuItem> = () => {
  return <MenuItem href="/example" text="example" />;
};

MenuItemStore.decorators = [withList];
