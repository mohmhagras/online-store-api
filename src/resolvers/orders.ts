import mongoose from "mongoose";
import connectDB from "../config/dbConnection";
import Order from "../models/Orders";
require("dotenv").config();

const ordersResolver = async (_parent: any, args: any) => {
  await connectDB();
  return await Order.find();
};

export default ordersResolver;
