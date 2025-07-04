import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
    }
  }
`;
