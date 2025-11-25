import mongoose from "mongoose";

export const connectToDB = (func) => {
  mongoose
    .connect(process.env.URI, {
      dbName: "Users",
    })
    .then(() => {
      func();
      console.log("MongoDB is Connected, Congratulations 🎉 🎊");
    })
    .catch((err) => {
      console.log("Error while connecting to DB ->", err);
    });
};
