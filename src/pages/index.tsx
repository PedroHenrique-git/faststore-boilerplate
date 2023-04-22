import { config } from '@config/store';
import { Home as HomePage } from '@pages/Home';
import { GetStaticProps } from 'next';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import Cms from 'src/services/cms/Cms';

const getIndexCms = () =>
  Cms.getAllCmsPagesByContentType('page', {
    filters: {
      'settings.seo.slug': '/',
    },
  });

function Home() {
  const { data } = useQuery({
    queryKey: 'index',
    queryFn: getIndexCms,
  });

  return <HomePage cmsHome={data?.data?.[0] ?? null} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('index', () => getIndexCms());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: config.revalidate,
  };
};

export default Home;
