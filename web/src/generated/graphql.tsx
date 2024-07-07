import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  products: Array<Product>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CategoryInput = {
  name: Scalars['String'];
};

export type CreateProductInput = {
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Array<Scalars['Float']>>;
  stock?: Maybe<Array<Scalars['Float']>>;
  variant?: Maybe<Array<Scalars['String']>>;
  type?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  pictureUrl?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<Scalars['String']>;
};


export type EmailPasswordInput = {
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  createCategory: Category;
  createProduct: Product;
  updateProduct: Product;
};


export type MutationRegisterArgs = {
  options: EmailPasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationUpdateProductArgs = {
  input: CreateProductInput;
  id: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  title: Scalars['String'];
  price: Array<Scalars['Float']>;
  stock?: Maybe<Array<Scalars['Float']>>;
  variant?: Maybe<Array<Scalars['String']>>;
  type?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  category: Category;
  location: Scalars['String'];
  pictureUrl?: Maybe<Array<Scalars['String']>>;
  status: Scalars['String'];
  seller: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  categories: Array<Category>;
  products: Array<Product>;
  productById: Product;
};


export type QueryProductByIdArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  profilePictureUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  addres?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  nik?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  products: Array<Product>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'description' | 'location' | 'pictureUrl' | 'price' | 'status' | 'type' | 'variant' | 'createdAt' | 'updatedAt'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  options: EmailPasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'profilePictureUrl' | 'addres' | 'city' | 'email' | 'name' | 'nik' | 'phoneNumber' | 'province' | 'role' | 'username' | 'createdAt' | 'updatedAt'>
  )> }
);

export type ProductByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ProductByIdQuery = (
  { __typename?: 'Query' }
  & { productById: (
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'description' | 'location' | 'pictureUrl' | 'stock' | 'price' | 'status' | 'type' | 'variant' | 'createdAt' | 'updatedAt'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), seller: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profilePictureUrl' | 'name' | 'phoneNumber'>
    ) }
  ) }
);

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'description' | 'location' | 'stock' | 'pictureUrl' | 'price' | 'status' | 'type' | 'variant' | 'createdAt' | 'updatedAt'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name'>
    ), seller: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profilePictureUrl' | 'name' | 'phoneNumber'>
    ) }
  )> }
);


export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    title
    category {
      id
      name
    }
    description
    location
    pictureUrl
    price
    status
    type
    variant
    createdAt
    updatedAt
  }
}
    `;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      id
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: EmailPasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    profilePictureUrl
    addres
    city
    email
    name
    nik
    phoneNumber
    province
    role
    username
    createdAt
    updatedAt
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProductByIdDocument = gql`
    query ProductById($id: Float!) {
  productById(id: $id) {
    id
    title
    category {
      id
      name
    }
    description
    location
    pictureUrl
    stock
    price
    status
    type
    variant
    seller {
      id
      profilePictureUrl
      name
      phoneNumber
    }
    createdAt
    updatedAt
  }
}
    `;

export function useProductByIdQuery(options: Omit<Urql.UseQueryArgs<ProductByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductByIdQuery>({ query: ProductByIdDocument, ...options });
};
export const ProductsDocument = gql`
    query Products {
  products {
    id
    title
    category {
      id
      name
    }
    description
    location
    stock
    pictureUrl
    price
    status
    type
    variant
    seller {
      id
      profilePictureUrl
      name
      phoneNumber
    }
    createdAt
    updatedAt
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};