import { OrdersList } from '@organisms/MyAccount';
import { Error } from '@organisms/MyAccount/Error';
import orders from '@services/orders';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import { OrdersListSkeleton } from 'src/components/skeletons/OrdersListSkeleton';
import { userData } from 'src/sdk/state';

function Page() {
  const [userContent, setUserContent] = useAtom(userData);

  const { isLoading, isError } = useQuery({
    queryKey: 'my-account-orders',
    queryFn: () => orders.getOrdersList(),
    onSuccess({ data }) {
      setUserContent({ ...userContent, orders: data.list });
    },
    cacheTime: 0,
    staleTime: 0,
  });

  if (isError) {
    return (
      <>
        <NextSeo nofollow noindex />

        <Error message="Error loading your orders, please try again in a few minutes" />
      </>
    );
  }

  return (
    <>
      <NextSeo nofollow noindex />

      {isLoading ? <OrdersListSkeleton /> : <OrdersList />}
    </>
  );
}

export default Page;
