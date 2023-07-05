import { OrderDetail } from '@organisms/MyAccount';
import orders from '@services/orders';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { OrderDetailSkeleton } from 'src/components/skeletons/OrderDetailSkeleton';
import { userData } from 'src/sdk/state';

interface Params {
  id?: string;
}

function Page() {
  const [userContent, setUserContent] = useAtom(userData);
  const { query } = useRouter();

  const { id }: Params = query;

  const { isLoading } = useQuery({
    queryKey: id,
    queryFn: () => orders.getOrderDetails(id ?? ''),
    cacheTime: 0,
    staleTime: 0,
    enabled: Boolean(id),
    onSuccess({ data }) {
      setUserContent({ ...userContent, selectedOrder: data });
    },
  });

  return (
    <>
      <NextSeo nofollow noindex />

      {isLoading ? <OrderDetailSkeleton /> : <OrderDetail />}
    </>
  );
}

export default Page;
