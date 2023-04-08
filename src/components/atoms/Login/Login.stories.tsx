import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Login } from './Login';

export default {
  title: 'components/atoms/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

export const StoreLogin: ComponentStory<typeof Login> = () => {
  return <Login />;
};
