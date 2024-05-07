import app from "./index.js";
import { PORT } from "./env.js";
import { connectMongooseToMongoDB } from "./config/mongooseConfig.js";

app.listen(PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
  connectMongooseToMongoDB()
});