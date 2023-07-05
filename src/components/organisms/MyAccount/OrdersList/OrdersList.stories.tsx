import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useAtom } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffectOnce } from 'react-use';
import { userData } from 'src/sdk/state';
import { OrdersList } from '.';

export default {
  title: 'components/organisms/MyAccount',
  component: OrdersList,
} as ComponentMeta<typeof OrdersList>;

const queryClient = new QueryClient();

export const StoreMyAccountOrdersList: ComponentStory<
  typeof OrdersList
> = () => {
  const [userContent, setUserData] = useAtom(userData);

  useEffectOnce(() => {
    setUserData({
      ...userContent,
      orders: [
        {
          ShippingEstimatedDate: null,
          ShippingEstimatedDateMax: null,
          ShippingEstimatedDateMin: null,
          affiliateId: '',
          authorizedDate: null,
          callCenterOperatorName: null,
          clientName: 'storybook',
          creationDate: '2023-07-04T14:32:39.0000000+00:00',
          currencyCode: 'BRL',
          items: [],
          listId: null,
          listType: null,
          marketPlaceOrderId: 'storybook',
          orderId: 'storybook',
          orderIsComplete: true,
          origin: 'storybook',
          paymentNames: 'storybook',
          salesChannel: '1',
          sequence: '509677',
          status: 'payment-pending',
          statusDescription: 'Pagamento Pendente',
          totalItems: 3,
          totalValue: 5000,
          workflowInErrorState: false,
          workflowInRetry: false,
          lastMessageUnread: '',
        },
      ],
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <OrdersList />
    </QueryClientProvider>
  );
};
