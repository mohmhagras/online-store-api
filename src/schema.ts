import { gql } from "apollo-server";

const typeDefs = gql`
  type Price {
    currency: Currency!
    amount: Float!
  }

  type Attribute {
    displayValue: String
    value: String
    id: String!
  }

  type AttributeSet {
    id: String!
    name: String
    type: String
    items: [Attribute]
  }

  type Product {
    id: String!
    name: String!
    stock: Int!
    gallery: [String]
    description: String!
    category: String!
    attributes: [AttributeSet]
    prices: [Price!]!
    brand: String!
  }

  type Category {
    name: String
    products: [Product]!
  }

  type Currency {
    label: String!
    symbol: String!
  }
  type OrderItem {
    productId: String!
    productQuantity: Int!
    selectedAttributes: String
  }
  type Order {
    clientname: String!
    country: String!
    phone: String!
    email: String!
    address: String!
    items: [OrderItem]!
    status: String!
    date: String!
    orderId: ID!
  }

  input CategoryInput {
    title: String!
  }
  input ItemInOrderInput {
    productId: String!
    productQuantity: Int!
    selectedAttributes: String!
  }
  input OrderInput {
    clientname: String!
    country: String!
    phone: String!
    email: String!
    address: String!
    items: [ItemInOrderInput]!
  }
  input OrderUpdateInput {
    orderId: String!
    email: String!
    status: String!
  }
  type Query {
    categories: [Category]
    category(input: CategoryInput): Category
    product(id: String!): Product
    currencies: [Currency]
    orders: [Order]
  }

  type Mutation {
    makeOrder(order: OrderInput): Boolean
    updateOrderStatus(orderUpdate: OrderUpdateInput!): Boolean
  }
`;

export default typeDefs;
