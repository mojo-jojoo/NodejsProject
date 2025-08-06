import mongoose from "mongoose";
import { Db_Name } from "../constants.js";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(`${process.env.mongoDB_URL}/${Db_Name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("\nConnected! DB HOST ON:", connectInstance.connection.host);
  } catch (error) {
    // Log the actual error message
    console.error("Error connecting to MongoDB:", error.message);
    // Optionally, exit the process if the DB connection fails critically:
    process.exit(1);
  }
};

export default connectDB;
