import { respond } from "../utils/response.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv" 
import bcrypt from "bcrypt"

dotenv.config()

export const signUp = async (req,res) => {
    try{

        // Destructure fields from the request body
        const {
            name,
            email,
            password,
            about
        } = req.body;
    
        // Check if All Details are there or not
        if(!name  || !email || !password || !about) {
            return respond(res,"All fields are required while signup",400,false)
        }

        // Check if user already exists
        const existinguser = await User.findOne({email});
        if(existinguser) {
            respond(res,"User is already exist",400,false)
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);
    
        //create the user
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
        // Get email and password from request body
        const {email,password} = req.body;

        // Check if email or password is missing
        if(!email || !password) {
            return respond(res,"All fields are required",403,false)
        }

        // Find user with provided email
        const user = await User.findOne({email})
        // If user not found with provided email
        if(!user) {
            return respond(res,"user is not registerd, Please signup first",404,false)
        }

        // Generate JWT token and Compare Password
        if(await bcrypt.compare(password,user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn: "10h",
            });

            // Save token to user document in database
            user.token = token;
            user.password = undefined

            // Set cookie for token and return success response
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