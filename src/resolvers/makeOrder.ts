import mongoose from "mongoose";
import Order from "../models/Orders";
import Product from "../models/Products";
import ShortUniqueId from "short-unique-id";
import connectDB from "../config/dbConnection";
const nodemailer = require("nodemailer");
require("dotenv").config();
type Args = {
  order: {
    clientname: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    items: Array<{
      productId: string;
      productQuantity: number;
      selectedAttributes: string;
    }>;
  };
};

const makeOrderResolver = async (_parent: any, args: Args) => {
  const uid = new ShortUniqueId({ length: 3 });
  const { clientname, address, country, email, phone, items } = args.order;
  try {
    await connectDB();
    const newOrder = await Order.create({
      clientname: clientname,
      email: email,
      phone: phone,
      address: address,
      country: country,
      items: items,
      status: "processing",
      orderId: `ORD-${uid()}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });

    for (let item of items) {
      await Product.findOneAndUpdate(
        { id: item.productId },
        { $inc: { stock: -item.productQuantity } }
      );
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Your order has been made!`,
      html: `
        <h3>Hello ${clientname},</h3>
        <p>We got your order and will start processing it now! <br/>You will be updated by email on the status of your order.</p>
        `,
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    console.log(newOrder);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default makeOrderResolver;
