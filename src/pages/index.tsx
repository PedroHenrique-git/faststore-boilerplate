import { config } from '@config/store';
import { Home as HomePage } from '@pages/Home';
import { GetStaticProps } from 'next';
import { NextSeo, SiteLinksSearchBoxJsonLd } from 'next-seo';
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

  const { seo } = data?.data?.[0].settings ?? {
    seo: {
      description: config.base.seo.description,
      slug: '/',
      title: config.base.seo.title,
    },
  };

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        titleTemplate={config.base.seo.titleTemplate}
        canonical={seo.canonical ?? config.base.externalUrls.storeUrl}
        openGraph={{
          type: 'website',
          url: config.base.externalUrls.storeUrl,
          title: seo.title,
          description: seo.description,
        }}
      />
      <SiteLinksSearchBoxJsonLd
        url={config.base.externalUrls.storeUrl}
        potentialActions={[
          {
            target: `${config.base.externalUrls.storeUrl}/s/?q`,
            queryInput: 'search_term_string',
          },
        ]}
      />
      <HomePage cmsHome={data?.data?.[0] ?? null} />
    </>
  );
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
