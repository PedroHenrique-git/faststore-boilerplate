import { MyAccount } from '@organisms/MyAccount';
import SafeData from '@services/safedata/SafeData';
import { useSetAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import { userData } from 'src/sdk/state';

function Page() {
  const setUserData = useSetAtom(userData);

  useQuery({
    queryKey: 'my-account-user-data',
    queryFn: () => SafeData.getUserData(),
    onSuccess(data) {
      setUserData({ user: data[0] });
    },
  });

  return (
    <>
      <NextSeo nofollow noindex />

      <MyAccount />
    </>
  );
}

export default Page;
