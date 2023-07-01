import { Profile } from '@organisms/MyAccount/Profile';
import safedata from '@services/safedata';
import { useAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import { ProfileSkeleton } from 'src/components/skeletons/ProfileSkeleton';
import { userData } from 'src/sdk/state';

function Page() {
  const [user, setUser] = useAtom(userData);

  const { isLoading } = useQuery({
    queryKey: 'my-account-user-data',
    queryFn: () => safedata.getUserData(),
    onSuccess(data) {
      setUser({ ...user, user: data[0] });
    },
  });

  return (
    <>
      <NextSeo nofollow noindex />

      {isLoading ? <ProfileSkeleton /> : <Profile />}
    </>
  );
}

export default Page;
