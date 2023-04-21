import {
  ProductPageQuery,
  ProductPageQueryVariables,
} from '@generated/graphql';
import { Pdp } from '@pages/Pdp';
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

function Page({ slug }: Props) {
  const { data, isError } = useQuery({
    queryKey: slug,
    queryFn: () => getProductBySlug(slug),
  });

  if (isError || !data) {
    return null;
  }

  const { product } = data;

  return <Pdp product={product} />;
}

export const getStaticProps: GetStaticProps<
  { dehydratedState: DehydratedState; slug: string },
  { slug: string }
> = async (ctx) => {
  const queryClient = new QueryClient();
  const { slug } = ctx.params ?? { slug: '' };

  await queryClient.prefetchQuery(slug, () => getProductBySlug(slug));

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
