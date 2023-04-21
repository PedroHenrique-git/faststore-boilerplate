import {
  ProductPageQuery,
  ProductPageQueryVariables,
} from '@generated/graphql';
import { Pdp } from '@pages/Pdp';
import Cms from '@services/cms/Cms';
import { GetStaticPaths, GetStaticProps } from 'next';
import { DehydratedState, QueryClient, dehydrate, useQuery } from 'react-query';
import { ProductPageQuery as ProductPageQueryGql } from 'src/graphql/queries/ProductPageQuery';
import { graphqlClient } from 'src/server/graphql';

interface Props {
  slug: string;
}

const getProductBySlug = (slug: string) =>
  graphqlClient.request<ProductPageQuery, ProductPageQueryVariables>(
    ProductPageQueryGql,
    { locator: [{ key: 'slug', value: slug }] },
  );

const getCmsPdp = () => Cms.getAllCmsPagesByContentType('pdp');

function Page({ slug }: Props) {
  const { data: productData, isError: productDataError } = useQuery({
    queryKey: slug,
    queryFn: () => getProductBySlug(slug),
  });

  const { data: productCms } = useQuery({
    queryKey: `${slug}-cms`,
    queryFn: getCmsPdp,
  });

  if (productDataError || !productData) {
    return null;
  }

  const { product } = productData;

  return <Pdp product={product} cmsPdp={productCms?.data?.[0] ?? null} />;
}

export const getStaticProps: GetStaticProps<
  { dehydratedState: DehydratedState; slug: string },
  { slug: string }
> = async (ctx) => {
  const queryClient = new QueryClient();
  const { slug } = ctx.params ?? { slug: '' };

  await Promise.all([
    queryClient.prefetchQuery(`${slug}-cms`, getCmsPdp),
    queryClient.prefetchQuery(slug, () => getProductBySlug(slug)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Page;
