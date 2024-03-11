import { Request, Response } from "express";
import userServices from '../services/user.service';
import { UserDocument, UserInput } from "../models/user.models";
import bcrypt from 'bcrypt';
import { Jwt } from "jsonwebtoken";

class userController {
    

    public async create(req: Request, res: Response) {

        try {

            const userExist : UserDocument | null = await userServices.findByEmail(req.body.email);

            req.body.password = await bcrypt.hash(req.body.password, 10);
            
            if (userExist) {

                return res.status(409).json({ message: 'User already exists' });

            }

            const user: UserDocument = await  userServices.createUser(req.body as UserInput);

            return res.status(201).json(user);

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async findByID(req: Request, res: Response) {

        try {
            
            const user : UserDocument | null = await userServices.findById(req.params.id);

            console.log(req.params.id);

            if (!user) {

                return res.status(404).json({message:'User not found'});

            } 

            return res.status(200).json(user);

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async getUsersByRol(req : Request, res : Response) {

        try {

            const users = await userServices.findAllByRol(req.body.rol.toLowerCase());
            res.json(users);

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async update(req: Request, res: Response) {

        try {

            const userExist : UserDocument | null = await userServices.findById(req.params.id);

            console.log(req.params.id);

            if (!userExist) {

                return res.status(404).json({message:'User not found'});

            }

            if (req.body.password) {

                req.body.password = await bcrypt.hash(req.body.password, 10);

            }

            const updateUser: UserDocument | null = await userServices.updateUser(req.params.id, req.body);

            return res.status(200).json(updateUser);

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async delete(req: Request, res: Response) {

        try {

            const userExist : UserDocument | null = await userServices.findById(req.params.id);
    
            console.log(req.params.id);

            if (!userExist) {

                return res.status(404).json({message:'User not found'});

            }

            const user: UserDocument | null = await userServices.deleteUser(req.params.id);

            return res.status(200).json({message: "User has been deleted", user});

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async getUsers(req: Request, res: Response) {

        try {

            const users = await userServices.findAll();
            res.json(users);

        } catch (error) {
            
            return res.status(500).json(error);

        }
        
    }

    public async login(req: Request, res: Response) {

        try {

            const userExist : UserDocument | null = await userServices.findByEmail(req.body.email);

            if (!userExist) {

                return res.status(401).json({ message: 'Not Authorized' });

            }

            const isMatch:boolean = await bcrypt.compare(req.body.password, userExist.password);

            if (!isMatch) {

                return res.status(401).json({ message: 'Not Authorized' });

            }

            return res.status(200).json(userServices.generateToken(userExist));

        } catch (error) {
            
            return res.status(500).json(error);

        }
        
    }

}

export default new userController();