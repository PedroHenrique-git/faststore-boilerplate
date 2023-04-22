import { gql } from 'graphql-request';

export const ShippingQuery = gql`
  query ShippingSimulation(
    $postalCode: String!
    $country: String!
    $items: [IShippingItem!]!
  ) {
    shipping(items: $items, postalCode: $postalCode, country: $country) {
      logisticsInfo {
        slas {
          carrier
          price
          shippingEstimate
          localizedEstimates
        }
      }
      address {
        city
        neighborhood
      }
    }
  }
`;
