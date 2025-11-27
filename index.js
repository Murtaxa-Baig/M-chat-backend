import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import { connectToDB } from "./utils/connectToDb.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

const app = express();
const server = createServer(app);

app.use(express.json());

app.get("/", (req, res) => {
  console.log("running murtaza's backend");
  res.send("Server is running");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/request", requestRoutes);

const port = process.env.PORT;

connectToDB(() => {
  server.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
});
