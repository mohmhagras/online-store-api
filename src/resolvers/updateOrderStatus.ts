import mongoose from "mongoose";
import Order from "../models/Orders";
import connectDB from "../config/dbConnection";
const nodemailer = require("nodemailer");

require("dotenv").config();
type Args = {
  orderUpdate: {
    orderId: string;
    email: string;
    status: string;
  };
};

const updateOrderStatusResolver = async (_parent: any, args: Args) => {
  console.log(args);
  try {
    await connectDB();

    const { orderId, email, status } = args.orderUpdate;

    await Order.findOneAndUpdate({ orderId: orderId }, { status: status });
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
      subject: `An update to your order happened`,
      html: `
        <h3>Order Update,</h3>
        <p>Your order is now ${status}</p>
        `,
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default updateOrderStatusResolver;
