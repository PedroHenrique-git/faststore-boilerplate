import { AddressForm } from '@organisms/MyAccount/AddressForm';
import { NextSeo } from 'next-seo';

function Page() {
  return (
    <>
      <NextSeo nofollow noindex />

      <AddressForm />
    </>
  );
}

export default Page;
