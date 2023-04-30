import { config } from '@config/store';
import {
  ProductPageQuery,
  ProductPageQueryVariables,
} from '@generated/graphql';
import { Pdp } from '@pages/Pdp';
import Cms from '@services/cms/Cms';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BreadcrumbJsonLd, NextSeo, ProductJsonLd } from 'next-seo';
import { DehydratedState, QueryClient, dehydrate, useQuery } from 'react-query';
import { ProductPageQuery as ProductPageQueryGql } from 'src/graphql/queries/ProductPageQuery';
import { useSession } from 'src/sdk/session';
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
  // TODO: revalidate data in the client side to include channel and local in the query
  // product from server without channel and locale
  const {
    session: { currency },
  } = useSession();

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

  const { seo } = product;
  const title = seo.title;
  const description = seo.description;
  const canonical = `${seo.canonical}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          type: 'og:product',
          url: canonical,
          title,
          description,
          images: product.image.map((img) => ({
            url: img.url,
            alt: img.alternateName,
          })),
        }}
        additionalMetaTags={[
          {
            property: 'product:price:amount',
            content: product.offers.lowPrice?.toString() ?? undefined,
          },
          {
            property: 'product:price:currency',
            content: currency.code,
          },
        ]}
      />
      <BreadcrumbJsonLd
        itemListElements={product.breadcrumbList.itemListElement}
      />
      <ProductJsonLd
        productName={product.name}
        description={product.description}
        brand={product.brand.name}
        sku={product.sku}
        gtin={product.gtin}
        releaseDate={product.releaseDate}
        images={product.image.map((img) => img.url)}
        offersType="AggregateOffer"
        offers={{
          ...product.offers,
          ...product.offers.offers[0],
          url: canonical,
        }}
      />
      <Pdp product={product} cmsPdp={productCms?.data?.[0] ?? null} />;
    </>
  );
}

export const getStaticProps: GetStaticProps<
  { dehydratedState: DehydratedState; slug: string },
  { slug: string }
> = async (ctx) => {
  const queryClient = new QueryClient();
  const { slug } = ctx.params ?? { slug: '' };

  await Promise.all([
    queryClient.prefetchQuery(`${slug}-cms`, () => getCmsPdp()),
    queryClient.prefetchQuery(slug, () => getProductBySlug(slug)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug,
    },
    revalidate: config.revalidate,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Page;
