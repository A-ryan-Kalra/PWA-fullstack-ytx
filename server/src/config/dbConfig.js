import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      "Database connected successfully on",
      connect.connection.host,
      "\nDatabase name:",
      connect.connection.name
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
