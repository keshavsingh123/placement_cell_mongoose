import mongoose from "mongoose";

export const connectMongooseToMongoDB = async () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/placement", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log(" Mongoose is connected");
      })
  } catch (err) {
    console.log(err);
  }
};
