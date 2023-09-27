import express from "express";
import { Blog,User } from "../models/blogListModel.js";
import cors from 'cors';
import bcrypt, { hash } from 'bcrypt'
import jwt from "jsonwebtoken";

const router = express.Router();

router.use(cors());

const JWT_SECRET = 5341658431


router.get("/", async(request,response) => {
    try{
        const blogs = await Blog.find({});
        return response.status(200).json(blogs);
    }
    catch(error){
        console.log(error.message);
    }
})

router.get("/:id", async(request,response) => {
    try{
        const {id} = request.params;
        const blogs = await Blog.findById(id);
        return response.status(200).json(blogs);
    }
    catch(error){
        console.log(error.message);
    }
})

router.post("/create", async(request,response) => {
    try{
        if (!request.body.title || !request.body.caption || !request.body.description){
            return response.status(400).send({
                message: "Send all the required fields"
            });
        }
        const newBook = {
            title: request.body.title,
            caption: request.body.caption,
            description: request.body.description,
        }
        const newBlog = await Blog.create(newBook)
        return response.status(200).send(newBlog);
    }
    catch(error){
        console.log(error.message);
    }
})

router.post("/registration",async(request,response) => {
    try{
        const {name,email,password} = request.body;
        const hashedPassword = await bcrypt.hash(request.body.password,10);
        console.log(hashedPassword);
        const checkUser = await User.findOne({email});
        console.log(checkUser);
        if(checkUser === null) {
            const newUserRegistration = {
                name: name,
                email: email,
                password: hashedPassword,
            }
            const newUser = await User.create(newUserRegistration)
            return response.status(200).send(newUser);
        }
        else{
            return response.status(400).send("User Already exists");
        }
    }
    catch(error){
        console.log(error.message);
    }
})

router.post("/login",async(request,response) => {
    try{
        const {email,password} = request.body;
        const user = await User.findOne({email});
        console.log(user);
        if (user === undefined){
            response.status(400).send("Invalid User");
        }
        else{
            const isPasswordMatched = await bcrypt.compare(password,user.password);
            console.log(isPasswordMatched);
            console.log(password,user.password);
            if(isPasswordMatched === true){
                const payload = {email,password}
                const jwt_token = jwt.sign(payload,"MY_SECRET_TOKEN");
                console.log(jwt_token);
                response.send(jwt_token);
            }
            else{
                response.status(400).send("Invalid Password");
            }
        }
    }
    catch(error){
        console.log(error.message)
    }
})


export default router;