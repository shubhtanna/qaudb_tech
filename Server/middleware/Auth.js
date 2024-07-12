import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { respond } from "../utils/response.js";

dotenv.config();


export const auth = async (req,res,next) => {
    try {
        
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return respond(res,"Token is missing", 401,false)
        }
        
        try {
           
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            
            req.user = decode;
        }
        catch(error){
            return respond(res,"token is Invalid",401,false)
        }
        
        next();
    }
    catch(error) {
        return respond(res,"Something went wrong while validating the token",401,false);
    }
}