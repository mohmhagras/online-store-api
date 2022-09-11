const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  attributes: {
    type: Array,
    required: true,
  },
});

module.exports = model("Product", ProductSchema);
