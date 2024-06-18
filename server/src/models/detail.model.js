import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },
});

const Detail = mongoose.model("Detail", userSchema);

export default Detail;
