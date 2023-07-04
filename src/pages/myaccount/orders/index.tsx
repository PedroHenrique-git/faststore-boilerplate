import { OrdersList } from '@organisms/MyAccount';
import orders from '@services/orders';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import { userData } from 'src/sdk/state';

function Page() {
  const [userContent, setUserContent] = useAtom(userData);

  useQuery({
    queryKey: 'my-account-orders',
    queryFn: () => orders.getOrdersList(),
    onSuccess({ data }) {
      setUserContent({ ...userContent, orders: data.list });
    },
    cacheTime: 0,
    staleTime: 0,
  });

  return (
    <>
      <NextSeo nofollow noindex />

      <OrdersList />
    </>
  );
}

export default Page;
