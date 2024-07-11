import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/database.js";
import { respond } from "./utils/response.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/User.js"
import cors from "cors"

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use("/api/v1/auth",userRouter)

app.get("/" , (req,res) => {
    return respond(res,"Your Server is up and running",200,true)
});

app.listen(PORT, () => {
    console.log(`your server started at ${PORT}`)
});