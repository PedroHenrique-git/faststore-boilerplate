import { Home as HomePage } from '@pages/Home';
import { GetStaticProps } from 'next';
import Cms from 'src/services/cms/Cms';
import { CmsPage } from 'src/services/cms/types';

interface Props {
  cmsHome: CmsPage | null;
}

function Home({ cmsHome }: Props) {
  return <HomePage cmsHome={cmsHome} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const cmsHome = await Cms.getAllCmsPagesByContentType('page', {
    filters: {
      'settings.seo.slug': '/',
    },
  });

  return {
    props: {
      cmsHome: cmsHome?.data?.[0] ?? null,
    },
  };
};

export default Home;
