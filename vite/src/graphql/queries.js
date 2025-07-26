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
      pricing {
        region
        amount
        currency
      }
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

export const GET_COUPONS = gql`
  query GetCoupons {
    getCoupons {
      id
      code
      type
      value
      currency
      expiration_date
    }
  }
`;

export const CREATE_COUPON = gql`
  mutation CreateCoupon($input: CreateCouponInput!) {
    createCoupon(input: $input) {
      id
    }
  }
`;

export const UPDATE_COUPON = gql`
  mutation UpdateCoupon($input: UpdateCouponInput!) {
    updateCoupon(input: $input) {
      id
    }
  }
`;

export const DELETE_COUPON = gql`
  mutation DeleteCoupon($id: ID!) {
    deleteCoupon(id: $id)
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      currency
      profession
      weight
      height
      date_of_birth
      age
      matrimonial_status
      description
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($id: ID!, $input: UpdateUserProfileInput!) {
    updateUserProfile(id: $id, input: $input) {
      id
      currency
      profession
      weight
      height
      date_of_birth
      age
      matrimonial_status
      description
    }
  }
`;