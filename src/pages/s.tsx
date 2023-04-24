import { SearchQuery } from '@generated/graphql';
import { ProductGallery } from '@templates/ProductGallery';
import { useSearch } from 'src/sdk/search/useSearch';
import { useSearchParams } from 'src/sdk/search/useSearchParams';

const searchResultAdapter = (data: SearchQuery | undefined) => {
  return {
    facets: data?.search?.facets ?? [],
    products: data?.search?.products?.edges?.map((edge) => edge.node) ?? [],
    totalProducts: data?.search.products.pageInfo.totalCount ?? 0,
  };
};

function Search() {
  const { selectedFacets, sort, term } = useSearchParams();

  const { data, isLoading } = useSearch({
    after: '0',
    first: 12,
    sort,
    term,
    selectedFacets,
  });

  const { facets, products, totalProducts } = searchResultAdapter(data);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <ProductGallery
        facets={facets}
        products={products}
        totalProducts={totalProducts}
        term={term}
      />
    </>
  );
}

export default Search;
