const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");


const dataProduct = mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
 
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  linkimage: {
    type: String,
  },
  linkproduct: {
    type: String,
  },
  // product: [
  //   {
  //     type: String,
  //   },
  // ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
});

const userData = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  desc: {
    type: String,
  },
  link: {
    type: String,
  },
  background: {
    type: String,
  },
  createUser: {
    type: String,
  },
  theme: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theme",
    },
  ],
});
userData.plugin(mongoosePaginate);
dataProduct.plugin(mongoosePaginate);
let theme = mongoose.model("theme", dataProduct);
let author = mongoose.model("author", userData);
module.exports = { theme, author };
