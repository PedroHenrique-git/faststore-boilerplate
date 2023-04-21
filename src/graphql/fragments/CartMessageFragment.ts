import { gql } from 'graphql-request';

export const CartMessageFragment = gql`
  fragment CartMessage on StoreCartMessage {
    text
    status
  }
`;
