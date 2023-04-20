import { gql } from 'graphql-request';

export const SubscribeNewsletter = gql`
  mutation SubscribeNewsletter($data: IPersonNewsletter!) {
    subscribeToNewsletter(data: $data) {
      id
    }
  }
`;
