const { model, Schema } = require("mongoose");

const OrderSchema = new Schema({
  clientname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
});

module.exports = model("Order", OrderSchema);
