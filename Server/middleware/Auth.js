import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { respond } from "../utils/response.js";

dotenv.config();

// This function is used as middleware to authenticate user requests
export const auth = async (req,res,next) => {
    try {
        // Extracting JWT from request cookies, body or header
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return respond(res,"Token is missing", 401,false)
        }
        
        try {
            // Verifying the JWT using the secret key stored in environment variables
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        }
        catch(error){
            return respond(res,"token is Invalid",401,false)
        }
        // If JWT is valid, move on to the next middleware or request handler
        next();
    }
    catch(error) {
        return respond(res,"Something went wrong while validating the token",401,false);
    }
}