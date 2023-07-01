import { CreateAddress } from '@organisms/MyAccount/CreateAddress/CreateAddress';
import { NextSeo } from 'next-seo';

function Page() {
  return (
    <>
      <NextSeo nofollow noindex />

      <CreateAddress />
    </>
  );
}

export default Page;
