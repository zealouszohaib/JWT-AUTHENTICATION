import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import UserRouter from "./routes/user-route.js";
import authRouter from "./routes/auth-route.js";
// require('dotenv').config();
dotenv.config();


console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);
 // set veriable into process.env.variables that are presnt into the file .env
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const port = process.env.PORT || 3000;

const corOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(join(__dirname, "public")));

app.use("/api/users", UserRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => console.log(`server is running at the port${port}`));
