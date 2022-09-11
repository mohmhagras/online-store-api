import getAllProducts from "../data";
import ProductModel from "../data/model/product";
import { Category, CategoryShape, CategoryMap } from "../data/type";
let products: Array<ProductModel>;

const categoriesResolver = (): CategoryShape[] => {
  getAllProducts().then((list) => {
    products = list;
  });
  console.log(products);
  const result = products.reduce((categories, product) => {
    const category = product.getCategory();

    if (!categories[category]) {
      categories[category] = {
        name: category,
        products: [],
      };
    }

    const {
      [category]: { products },
    } = categories;

    products.push(product);

    return categories;
  }, {} as CategoryMap);

  return [
    {
      name: Category.all,
      products,
    },
    ...Object.values(result),
  ];
};

export default categoriesResolver;
