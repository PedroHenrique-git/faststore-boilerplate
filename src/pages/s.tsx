import { config } from '@config/store';
import { SearchQuery } from '@generated/graphql';
import { ProductGallery } from '@templates/ProductGallery';
import { useSetAtom } from 'jotai';
import { NextSeo } from 'next-seo';
import { ProductGallerySkeleton } from 'src/components/skeletons/ProductGallerySekeleton';
import { DEFAULT_PER_PAGE } from 'src/sdk/constants';
import { useSearch } from 'src/sdk/search/useSearch';
import { useSearchParams } from 'src/sdk/search/useSearchParams';
import { paginationAtom } from 'src/sdk/state';

const searchResultAdapter = (data: SearchQuery | undefined) => {
  return {
    facets: data?.search?.facets ?? [],
    products: data?.search?.products?.edges?.map((edge) => edge.node) ?? [],
    totalProducts: data?.search.products.pageInfo.totalCount ?? 0,
    hasNextPage: data?.search.products.pageInfo.hasNextPage ?? false,
    hasPrevPage: data?.search.products.pageInfo.hasPreviousPage ?? false,
  };
};

function Search() {
  const setPaginationInfo = useSetAtom(paginationAtom);
  const { selectedFacets, sort, term, page } = useSearchParams();

  const { data, isLoading } = useSearch({
    variables: {
      after: String((Number(page) - 1) * DEFAULT_PER_PAGE),
      first: DEFAULT_PER_PAGE,
      sort,
      term,
      selectedFacets,
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

  const title = 'Search Results';
  const { description, titleTemplate } = config.base.seo;

  if (isLoading) {
    return <ProductGallerySkeleton />;
  }

  return (
    <>
      <NextSeo
        noindex
        title={title}
        description={description}
        titleTemplate={titleTemplate}
        openGraph={{
          type: 'website',
          title,
          description,
        }}
      />
      <ProductGallery facets={facets} products={products} term={term} />;
    </>
  );
}

export default Search;
