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
  createTransaction: Transaction;
  updateTransactionStatus: Transaction;
  midtransWebhook: Scalars['String'];
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


export type MutationCreateTransactionArgs = {
  productVariantIndex?: Maybe<Scalars['Int']>;
  productQuantity: Scalars['Int'];
  productPrice: Scalars['Int'];
  productId: Scalars['Int'];
};


export type MutationUpdateTransactionStatusArgs = {
  variantIndex: Scalars['Int'];
  quantity: Scalars['Int'];
  status: Scalars['String'];
  token: Scalars['String'];
};


export type MutationMidtransWebhookArgs = {
  data: Scalars['String'];
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
  transactionProduct: Array<TransactionProduct>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  categories: Array<Category>;
  products: Array<Product>;
  productById: Product;
  transactions: Array<Transaction>;
  transactionById: Transaction;
  myTransactions: Array<Transaction>;
  myTransactionById: Transaction;
  myTransactionByToken: Transaction;
};


export type QueryProductByIdArgs = {
  id: Scalars['Float'];
};


export type QueryTransactionByIdArgs = {
  id: Scalars['Int'];
};


export type QueryMyTransactionByIdArgs = {
  id: Scalars['Int'];
};


export type QueryMyTransactionByTokenArgs = {
  transactionToken: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['Float'];
  transactionToken: Scalars['String'];
  quantity: Scalars['Float'];
  price: Scalars['Float'];
  variantIndex?: Maybe<Scalars['Float']>;
  total: Scalars['Float'];
  status: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
  snapToken?: Maybe<Scalars['String']>;
  snapRedirectUrl?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  transactionProduct: Array<TransactionProduct>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type TransactionProduct = {
  __typename?: 'TransactionProduct';
  id: Scalars['Float'];
  transaction: Transaction;
  productId: Scalars['Float'];
  product: Product;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
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
  transactions: Array<Transaction>;
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

export type CreateTransactionMutationVariables = Exact<{
  productId: Scalars['Int'];
  productPrice: Scalars['Int'];
  productQuantity: Scalars['Int'];
  productVariantIndex?: Maybe<Scalars['Int']>;
}>;


export type CreateTransactionMutation = (
  { __typename?: 'Mutation' }
  & { createTransaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionToken' | 'snapToken' | 'snapRedirectUrl' | 'paymentMethod' | 'quantity' | 'variantIndex'>
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

export type UpdateTransactionStatusMutationVariables = Exact<{
  token: Scalars['String'];
  status: Scalars['String'];
  quantity: Scalars['Int'];
  variantIndex: Scalars['Int'];
}>;


export type UpdateTransactionStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateTransactionStatus: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionToken' | 'status'>
    & { transactionProduct: Array<(
      { __typename?: 'TransactionProduct' }
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'stock'>
      ) }
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

export type MyTransactionByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MyTransactionByIdQuery = (
  { __typename?: 'Query' }
  & { myTransactionById: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'paymentMethod' | 'snapRedirectUrl' | 'snapToken' | 'status' | 'total' | 'quantity' | 'price' | 'variantIndex' | 'transactionToken' | 'userId'>
    & { transactionProduct: Array<(
      { __typename?: 'TransactionProduct' }
      & Pick<TransactionProduct, 'id'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'description' | 'id' | 'location' | 'pictureUrl' | 'price' | 'status' | 'stock' | 'title' | 'type' | 'variant'>
        & { category: (
          { __typename?: 'Category' }
          & Pick<Category, 'id' | 'name'>
        ), seller: (
          { __typename?: 'User' }
          & Pick<User, 'name' | 'id' | 'profilePictureUrl' | 'phoneNumber'>
        ) }
      ) }
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'addres' | 'phoneNumber' | 'profilePictureUrl'>
    ) }
  ) }
);

export type MyTransactionByTokenQueryVariables = Exact<{
  transactionToken: Scalars['String'];
}>;


export type MyTransactionByTokenQuery = (
  { __typename?: 'Query' }
  & { myTransactionByToken: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'paymentMethod' | 'snapRedirectUrl' | 'snapToken' | 'status' | 'total' | 'quantity' | 'price' | 'variantIndex' | 'transactionToken' | 'userId'>
    & { transactionProduct: Array<(
      { __typename?: 'TransactionProduct' }
      & Pick<TransactionProduct, 'id'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'description' | 'id' | 'location' | 'pictureUrl' | 'price' | 'status' | 'stock' | 'title' | 'type' | 'variant'>
        & { category: (
          { __typename?: 'Category' }
          & Pick<Category, 'id' | 'name'>
        ), seller: (
          { __typename?: 'User' }
          & Pick<User, 'name' | 'id' | 'profilePictureUrl' | 'phoneNumber'>
        ) }
      ) }
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'addres' | 'phoneNumber' | 'profilePictureUrl'>
    ) }
  ) }
);

export type MyTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTransactionsQuery = (
  { __typename?: 'Query' }
  & { myTransactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'paymentMethod' | 'snapRedirectUrl' | 'snapToken' | 'status' | 'total' | 'quantity' | 'price' | 'variantIndex' | 'transactionToken' | 'userId' | 'createdAt' | 'updatedAt'>
    & { transactionProduct: Array<(
      { __typename?: 'TransactionProduct' }
      & Pick<TransactionProduct, 'id'>
      & { product: (
        { __typename?: 'Product' }
        & Pick<Product, 'description' | 'id' | 'location' | 'pictureUrl' | 'price' | 'status' | 'stock' | 'title' | 'type' | 'variant'>
        & { category: (
          { __typename?: 'Category' }
          & Pick<Category, 'id' | 'name'>
        ), seller: (
          { __typename?: 'User' }
          & Pick<User, 'name' | 'id' | 'profilePictureUrl' | 'phoneNumber'>
        ) }
      ) }
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'addres' | 'province' | 'city' | 'phoneNumber' | 'profilePictureUrl'>
    ) }
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
export const CreateTransactionDocument = gql`
    mutation CreateTransaction($productId: Int!, $productPrice: Int!, $productQuantity: Int!, $productVariantIndex: Int) {
  createTransaction(
    productId: $productId
    productPrice: $productPrice
    productQuantity: $productQuantity
    productVariantIndex: $productVariantIndex
  ) {
    id
    transactionToken
    snapToken
    snapRedirectUrl
    paymentMethod
    quantity
    variantIndex
  }
}
    `;

export function useCreateTransactionMutation() {
  return Urql.useMutation<CreateTransactionMutation, CreateTransactionMutationVariables>(CreateTransactionDocument);
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
export const UpdateTransactionStatusDocument = gql`
    mutation UpdateTransactionStatus($token: String!, $status: String!, $quantity: Int!, $variantIndex: Int!) {
  updateTransactionStatus(
    token: $token
    status: $status
    quantity: $quantity
    variantIndex: $variantIndex
  ) {
    id
    transactionToken
    status
    transactionProduct {
      product {
        stock
      }
    }
  }
}
    `;

export function useUpdateTransactionStatusMutation() {
  return Urql.useMutation<UpdateTransactionStatusMutation, UpdateTransactionStatusMutationVariables>(UpdateTransactionStatusDocument);
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
export const MyTransactionByIdDocument = gql`
    query MyTransactionById($id: Int!) {
  myTransactionById(id: $id) {
    id
    paymentMethod
    snapRedirectUrl
    snapToken
    status
    total
    quantity
    price
    variantIndex
    transactionProduct {
      id
      product {
        category {
          id
          name
        }
        description
        id
        location
        pictureUrl
        price
        seller {
          name
          id
          profilePictureUrl
          phoneNumber
        }
        status
        stock
        title
        type
        variant
      }
    }
    transactionToken
    userId
    user {
      name
      addres
      phoneNumber
      profilePictureUrl
    }
    userId
  }
}
    `;

export function useMyTransactionByIdQuery(options: Omit<Urql.UseQueryArgs<MyTransactionByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyTransactionByIdQuery>({ query: MyTransactionByIdDocument, ...options });
};
export const MyTransactionByTokenDocument = gql`
    query MyTransactionByToken($transactionToken: String!) {
  myTransactionByToken(transactionToken: $transactionToken) {
    id
    paymentMethod
    snapRedirectUrl
    snapToken
    status
    total
    quantity
    price
    variantIndex
    transactionProduct {
      id
      product {
        category {
          id
          name
        }
        description
        id
        location
        pictureUrl
        price
        seller {
          name
          id
          profilePictureUrl
          phoneNumber
        }
        status
        stock
        title
        type
        variant
      }
    }
    transactionToken
    userId
    user {
      name
      addres
      phoneNumber
      profilePictureUrl
    }
    userId
  }
}
    `;

export function useMyTransactionByTokenQuery(options: Omit<Urql.UseQueryArgs<MyTransactionByTokenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyTransactionByTokenQuery>({ query: MyTransactionByTokenDocument, ...options });
};
export const MyTransactionsDocument = gql`
    query MyTransactions {
  myTransactions {
    id
    paymentMethod
    snapRedirectUrl
    snapToken
    status
    total
    quantity
    price
    variantIndex
    transactionProduct {
      id
      product {
        category {
          id
          name
        }
        description
        id
        location
        pictureUrl
        price
        seller {
          name
          id
          profilePictureUrl
          phoneNumber
        }
        status
        stock
        title
        type
        variant
      }
    }
    transactionToken
    userId
    user {
      name
      addres
      province
      city
      phoneNumber
      profilePictureUrl
    }
    userId
    createdAt
    updatedAt
  }
}
    `;

export function useMyTransactionsQuery(options: Omit<Urql.UseQueryArgs<MyTransactionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyTransactionsQuery>({ query: MyTransactionsDocument, ...options });
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