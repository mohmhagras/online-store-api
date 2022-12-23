import getAllProducts from "../data";
import ProductModel from "../data/model/product";
import { Category, CategoryShape } from "../data/type";

type Args = {
  input?: {
    title: string;
  };
};
let products: Array<ProductModel>;

const categoryResolver = (_parent: any, args: Args): CategoryShape => {
  getAllProducts().then((list) => {
    products = list;
  });

  const { input: { title } = {} } = args;

  let result;

  if (!title || title === Category.all) {
    result = products;
  } else {
    result = products.filter(
      (product) => product.getCategory().toLowerCase() === title
    );
  }

  if (!result.length) {
    return null;
  }

  return {
    name: title ? (title as Category) : Category.all,
    products: result,
  };
};

export default categoryResolver;
