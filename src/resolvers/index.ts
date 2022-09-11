import categoryResolver from "./category";
import categoriesResolver from "./categories";
import currencyResolver from "./currencies";
import productResolver from "./product";
import makeOrderResolver from "./makeOrder";
import ordersResolver from "./orders";
import updateOrderStatusResolver from "./updateOrderStatus";
const resolvers = {
  Query: {
    categories: categoriesResolver,
    category: categoryResolver,
    currencies: currencyResolver,
    product: productResolver,
    orders: ordersResolver,
  },
  Mutation: {
    makeOrder: makeOrderResolver,
    updateOrderStatus: updateOrderStatusResolver,
  },
};

export default resolvers;
