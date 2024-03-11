import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from  'jsonwebtoken';
import { UserDocument } from "../models/user.models";
import userServices from "../services/user.service";

const auth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        let token = req.headers.authorization;

        if (!token) {

            return res.status(401).json({message: "Not authorized"});

        }

        token = token.replace("Bearer ", "");

        const decode = jwt.verify(token, process.env.JWT_SECRET || "secret")

        req.body.loggedUser = decode;

        const user: any = await userServices.findById((decode as any).user_id);

        if (req.path === "/users/profile") {

            req.params.id = (decode as any).user_id;

        } else if (req.path.startsWith("/users")) {

        if (user.rol !== "superadmin") {

            return res.status(403).json({ message: "Insufficient permissions" });

        }

        } else if (req.path.startsWith("/events/org") || req.path.startsWith("/user/rol")) {

            if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE" || req.method === "GET") {

                if (user.rol !== "organizador") {

                    return res.status(403).json({ message: "Insufficient permissions" });

                }

                req.body.organizador = (decode as any).user_id;

            }

        } else if (req.path.startsWith("event/subs")) {

            if (req.method === "POST" || req.method ===  "DELETE") {

                if (user.rol !== "asistente") {

                    return res.status(403).json({ message: "Insufficient permissions" });
                }

                req.body.userId = (decode as any).user_id;

            }

        }

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