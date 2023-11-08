import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose
      .connect(process.env.MONGO_URI)
      .then((mongoose) => {
        console.log("Connected to MongoDB " + mongoose.connection.host);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
