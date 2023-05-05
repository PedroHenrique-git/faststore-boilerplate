import { config } from '@config/store';
import {
  CollectionQuery,
  CollectionQueryVariables,
  SearchQuery,
} from '@generated/graphql';
import { ProductGallery } from '@templates/ProductGallery';
import { useSetAtom } from 'jotai';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ProductGallerySkeleton } from 'src/components/skeletons/ProductGallerySekeleton';
import { CollectionQuery as CollectionQueryGql } from 'src/graphql/queries/CollectionQuery';
import { DEFAULT_PER_PAGE } from 'src/sdk/constants';
import { useSearch } from 'src/sdk/search/useSearch';
import { useSearchParams } from 'src/sdk/search/useSearchParams';
import { paginationAtom } from 'src/sdk/state';
import { graphqlClient } from 'src/server/graphql';

interface Props {
  slug: string;
  metadataServer: CollectionQuery;
}

const searchResultAdapter = (data: SearchQuery | undefined) => {
  return {
    facets: data?.search?.facets ?? [],
    products: data?.search?.products?.edges?.map((edge) => edge.node) ?? [],
    totalProducts: data?.search.products.pageInfo.totalCount ?? 0,
    hasNextPage: data?.search.products.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.search.products.pageInfo.hasPreviousPage ?? false,
  };
};

const getCollectionMetadata = (slug: string) =>
  graphqlClient.request<CollectionQuery, CollectionQueryVariables>(
    CollectionQueryGql,
    { slug },
  );

function Collection({ slug, metadataServer }: Props) {
  const { asPath } = useRouter();
  const setPaginationInfo = useSetAtom(paginationAtom);
  const { selectedFacets, sort, term, page } = useSearchParams();

  const { data: metadata } = useQuery(slug, () => getCollectionMetadata(slug), {
    initialData: metadataServer,
  });

  const { data, isLoading } = useSearch({
    variables: {
      after: String((Number(page) - 1) * DEFAULT_PER_PAGE),
      first: DEFAULT_PER_PAGE,
      sort,
      term,
      selectedFacets: selectedFacets.concat(
        metadata?.collection?.meta?.selectedFacets ?? [],
      ),
    },
    onSuccess(data) {
      const { totalProducts, hasNextPage, hasPrevPage } =
        searchResultAdapter(data);

      setPaginationInfo({
        hasNextPage,
        hasPrevPage,
        totalProducts,
        totalPages: Math.ceil(totalProducts / DEFAULT_PER_PAGE),
      });
    },
  });

  const { facets, products } = searchResultAdapter(data);

  const pageQuery = page ? `?page=${page}` : '';
  const [pathname] = asPath.split('?');
  const title = metadata?.collection.seo.title ?? config.base.seo.title;
  const canonical = `${config.base.externalUrls.storeUrl}${pathname}${pageQuery}`;
  const description =
    metadata?.collection.seo.description ?? config.base.seo.description;

  if (isLoading) {
    return <ProductGallerySkeleton />;
  }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={config.base.seo.titleTemplate}
        canonical={canonical}
        openGraph={{
          type: 'website',
          title,
          description,
        }}
      />

      <BreadcrumbJsonLd
        itemListElements={
          metadataServer?.collection.breadcrumbList.itemListElement ?? []
        }
      />

      <ProductGallery
        facets={facets}
        products={products}
        term={term}
        breadcrumbItems={metadata?.collection.breadcrumbList.itemListElement}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<
  { metadataServer: CollectionQuery; slug: string },
  { slug: string[] }
> = async (ctx) => {
  const { slug } = ctx.params ?? { slug: [] };

  const joinedSlug = slug.join('/');

  try {
    const metadataServer = await getCollectionMetadata(joinedSlug);

    return {
      props: {
        metadataServer,
        slug: joinedSlug,
      },
      revalidate: config.revalidate,
    };
  } catch (_) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Collection;
