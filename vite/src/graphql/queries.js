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

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

export const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      id
      name
      role
      organization
      quote
      serviceCategory
      rating
    }
  }
`;


export const GET_SERVICES = gql`
  query GetServices {
    services {
      id
      title
      description
      category
      methodology
      targetAudience
      pricing
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation AddService($input: ServiceInput!) {
    addService(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService($id: ID!, $input: ServiceUpdateInput!) {
    updateService(id: $id, input: $input) {
      id
      title
      description
      category
      methodology
      targetAudience
      pricing
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(id: $id)
  }
`;
