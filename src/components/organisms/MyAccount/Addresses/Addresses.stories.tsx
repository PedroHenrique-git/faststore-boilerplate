import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useAtom } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffectOnce } from 'react-use';
import { userData } from 'src/sdk/state';
import { Addresses } from '.';

export default {
  title: 'components/organisms/MyAccount',
  component: Addresses,
} as ComponentMeta<typeof Addresses>;

const queryClient = new QueryClient();

export const StoreMyAccountAddress: ComponentStory<typeof Addresses> = () => {
  const [userContent, setUserData] = useAtom(userData);

  useEffectOnce(() => {
    setUserData({
      ...userContent,
      addresses: [
        {
          addressName: 'storybook',
          city: 'storybook',
          complement: 'storybook',
          country: 'storybook',
          geoCoordinates: [],
          id: 'storybook',
          neighborhood: 'storybook',
          number: '123',
          postalCode: 'storybook',
          reference: 'storybook',
          state: 'storybook',
          street: 'storybook',
          userId: 'storybook',
        },
        {
          addressName: 'storybook',
          city: 'storybook',
          complement: 'storybook',
          country: 'storybook',
          geoCoordinates: [],
          id: 'storybook',
          neighborhood: 'storybook',
          number: '123',
          postalCode: 'storybook',
          reference: 'storybook',
          state: 'storybook',
          street: 'storybook',
          userId: 'storybook',
        },
        {
          addressName: 'storybook',
          city: 'storybook',
          complement: 'storybook',
          country: 'storybook',
          geoCoordinates: [],
          id: 'storybook',
          neighborhood: 'storybook',
          number: '123',
          postalCode: 'storybook',
          reference: 'storybook',
          state: 'storybook',
          street: 'storybook',
          userId: 'storybook',
        },
      ],
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Addresses />
    </QueryClientProvider>
  );
};
