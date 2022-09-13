import { Category } from "./type";
import mongoose from "mongoose";
import connectDB from "../config/dbConnection";
import Product from "../models/Products";
import ProductModel from "./model/product";
import AttributeSet from "./model/attribute-set";
import Attribute from "./model/attribute";
let products: Array<ProductModel>;

export default async function getAllProducts() {
  try {
    await connectDB();
    const list = await Product.find();
    products = list.map(
      (item: {
        name: string;
        id: string;
        price: number;
        description: string;
        images: Array<string>;
        category: string;
        brand: string;
        stock: number;
        attributes: Array<any>;
      }) => {
        const product = new ProductModel(item.name)
          .setId(item.id)
          .setPrice(item.price)
          .setDescription(item.description)
          .addImages(item.images)
          .setCategory(
            item.category === "all"
              ? Category.all
              : item.category === "clothes"
              ? Category.clothes
              : Category.tech
          )
          .setBrand(item.brand)
          .setStock(item.stock);
        for (let attr of item.attributes) {
          const attribute = new AttributeSet(attr.name)
            .setType(attr.type)
            .addItemList(
              attr.items.map(
                (option: any) => new Attribute(option.id, option.value)
              )
            );
          product.addAttributeSet(attribute);
        }
        return product;
      }
    );
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

/*
let products: Array<ProductModel>;


try {
  connectDB();
  mongoose.connection.once("open", async () => {
    const list = await Product.find();
    products = list.map(
      (item: {
        name: string;
        id: string;
        price: number;
        description: string;
        images: Array<string>;
        category: string;
        brand: string;
        stock: number;
        attributes: Array<any>;
      }) => {
        const product = new ProductModel(item.name)
          .setId(item.id)
          .setPrice(item.price)
          .setDescription(item.description)
          .addImages(item.images)
          .setCategory(
            item.category === "all"
              ? Category.all
              : item.category === "clothes"
              ? Category.clothes
              : Category.tech
          )
          .setBrand(item.brand)
          .setStock(item.stock);
        for (let attr of item.attributes) {
          const attribute = new AttributeSet(attr.name)
            .setType(attr.type)
            .addItemList(
              attr.items.map(
                (option: any) => new Attribute(option.id, option.value)
              )
            );
          product.addAttributeSet(attribute);
        }
        return product;
      }
    );

    mongoose.connection.close();
  });
} catch (error) {
  console.log(error);
}
export { products };
*/
