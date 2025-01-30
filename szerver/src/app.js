import express from "express";
import cors from "cors";
import router from "./router/speedformula.router.js";
import dotenv from "dotenv";
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/", router);

app.get("/",(req,res)=>{
    res.json({
        apiName:"Speedformula",
        apiVersion:"1.0.0",
    });
});

export default app;