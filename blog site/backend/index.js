import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import blogsRoute from './routes/blogsRoute.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = 5555;
const mongoDBURL = "mongodb+srv://pujithkumar:Pujithkumar@bloglist.yp2ysqb.mongodb.net/blogs-list?retryWrites=true&w=majority"

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to the project");
})

app.use('/blogs',blogsRoute);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App Connected to Database");
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    })
})

.catch((err) => {
    console.log(err);
})