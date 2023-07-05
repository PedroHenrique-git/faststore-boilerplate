import { Addresses } from '@organisms/MyAccount/Addresses';
import { Error } from '@organisms/MyAccount/Error';
import safedata from '@services/safedata';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { AddressesListSkeleton } from 'src/components/skeletons/AddressesListSkeleton';
import { useSession } from 'src/sdk/session';
import { userData } from 'src/sdk/state';

const useClearSelectedAddress = () => {
  const { events, pathname } = useRouter();
  const [user, setUser] = useAtom(userData);

  useEffect(() => {
    const cb = () => {
      if (pathname !== 'myaccount/addresses/edit') {
        setUser({ ...user, selectedAddress: null });
      }
    };

    events.on('routeChangeComplete', cb);

    return () => {
      events.off('routeChangeComplete', cb);
    };
  }, [events, pathname, user, setUser]);
};

function Page() {
  const {
    session: { person },
    isValidating,
  } = useSession();

  const [user, setUser] = useAtom(userData);

  const { isLoading, isError } = useQuery({
    queryKey: 'my-account-user-addresses',
    queryFn: () => safedata.getUserAddresses(),
    onSuccess(data) {
      setUser({ ...user, addresses: data ?? [] });
    },
    enabled: !isValidating && !!person?.id,
    staleTime: 0,
    cacheTime: 0,
  });

  useClearSelectedAddress();

  if (isError) {
    return (
      <>
        <NextSeo nofollow noindex />

        <Error message="Error loading your addresses, please try again in a few minutes" />
      </>
    );
  }

  return (
    <>
      <NextSeo nofollow noindex />

      {isLoading ? <AddressesListSkeleton /> : <Addresses />}
    </>
  );
}

export default Page;
