import { Addresses } from '@organisms/MyAccount/Addresses';
import safedata from '@services/safedata';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import { useSession } from 'src/sdk/session';
import { userData } from 'src/sdk/state';

function Page() {
  const {
    session: { person },
    isValidating,
  } = useSession();
  const [user, setUser] = useAtom(userData);

  useQuery({
    queryKey: 'my-account-user-addresses',
    queryFn: () => safedata.getUserAddresses(person?.id ?? ''),
    onSuccess(data) {
      setUser({ ...user, addresses: data ?? [] });
    },
    enabled: !isValidating && !!person?.id,
  });

  return (
    <>
      <NextSeo nofollow noindex />

      <Addresses />
    </>
  );
}

export default Page;
