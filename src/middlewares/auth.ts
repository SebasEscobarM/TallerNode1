import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from  'jsonwebtoken';
import { UserDocument } from "../models/user.models";

const auth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        let token = req.headers.authorization;

        if (!token) {

            return res.status(401).json({message: "Not authorized"});

        }

        token = token.replace("Bearer ", "");

        const decode = jwt.verify(token, process.env.JWT_SECRET || "secret")

        req.body.loggedUser = decode;

        req.params.id = (decode as any).user_id;

        //return res.status(200).json(decode);

        next();

    } catch (error) {
        
        if (error instanceof TokenExpiredError) {

            return res.status(401).json({message: "Token Expired", error});

        } else {

            return res.status(401).json({message: "Token Invalid", error});

        }

    }

} 

export default auth;