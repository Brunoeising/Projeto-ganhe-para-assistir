import Express, { json } from "express";
import connectDb from "./utils/connectMongo.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3001;

const app = Express();

app.use(cors());

app.use(json());

app.use("/api/user", userRoutes);

app.listen(port, () => {
  connectDb();
  console.log(`Server is running on port ${port}`);
});
