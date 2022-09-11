import getAllProducts from "../data";

type Args = {
  id: string;
};

const productResolver = async (_parent: any, args: Args) => {
  const products = await getAllProducts();
  return products.find((product) => product.getId() === args.id);
};
export default productResolver;
