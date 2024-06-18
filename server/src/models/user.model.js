import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  endpoint: {
    type: [Object],
  },
  // title: {
  //   type: String,
  // },
  // body: {
  //   type: String,
  // },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },
});

const User = mongoose.model("User", userSchema);

export default User;
