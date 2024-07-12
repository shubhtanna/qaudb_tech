import { respond } from "../utils/response.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv" 
import bcrypt from "bcrypt"

dotenv.config()

export const signUp = async (req,res) => {
    try{

        const {
            name,
            email,
            password,
            about
        } = req.body;
    
        
        if(!name  || !email || !password || !about) {
            return respond(res,"All fields are required while signup",400,false)
        }

        const existinguser = await User.findOne({email});
        if(existinguser) {
            respond(res,"User is already exist",400,false)
        }
    
        
        const hashedPassword = await bcrypt.hash(password,10);
    
        
        const user = await User.create({
            name,email,password:hashedPassword,about
        })

        respond(res,"User  is registerd Successfully",200,true)
    }
    catch(error) {
        console.log(error)
        console.log(error.message)
        respond(res,"User cannot be  registerd successfully, Please try again",500,false)
    }
}

export const login = async (req,res) => {
    try{
        
        const {email,password} = req.body;

        
        if(!email || !password) {
            return respond(res,"All fields are required",403,false)
        }

        
        const user = await User.findOne({email})
        
        if(!user) {
            return respond(res,"user is not registerd, Please signup first",404,false)
        }

        
        if(await bcrypt.compare(password,user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn: "10h",
            });

          
            user.token = token;
            user.password = undefined

           
            const options = {
                expires: new Date(Date.now() + 3*2*60*60*1000),
                httpOnly: true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully",
            })
        }
        else {
            return respond(res,"Password is incorrect", 401,false)
        }
    }
    catch(error){
        console.log(error);
        respond(res,"Login failure, Please try againn",500,false)
    }
};