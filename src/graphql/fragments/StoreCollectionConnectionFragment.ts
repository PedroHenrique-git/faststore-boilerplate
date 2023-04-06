import { gql } from 'graphql-request';

export const StoreCollectionConnectionFragment = gql`
  fragment StoreCollectionConnectionFragment on StoreCollectionConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      totalCount
      __typename
    }

    edges {
      node {
        seo {
          title
          titleTemplate
          description
          canonical
        }
        breadcrumbList {
          itemListElement {
            item
            name
            position
          }
          numberOfItems
        }
        slug
        type
      }
    }
  }
`;
