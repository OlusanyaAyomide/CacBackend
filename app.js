import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan"
dotenv.config({ path: "./config.env" });
import AppError from "./utils/AppError.js"
import ErrorController from "./controllers/ErrorController.js"
import formrouter from "./routes/FormRoutes.js"

const app  = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!');
});


mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log(e);
    console.log("Error connecting to database")
});
app.use("/api/v1",formrouter);

app.all("*",(req,res,next)=>{
    next(new AppError(`Cant find this ${req.originalUrl} on this sever`,404));
  })

app.use(ErrorController)

export default app;