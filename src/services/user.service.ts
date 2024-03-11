import UserModel, {UserInput, UserDocument} from "../models/user.models";
import jwt from "jsonwebtoken";

class UserService {

    public  async createUser(userInput: UserInput): Promise<UserDocument> {

        try {

            const user = await UserModel.create(userInput);
            return user;

        } catch (error) {

            throw error;

        }

    }

    public  async updateUser(id: string, userInput: UserInput): Promise<UserDocument | null> {

        try {

            const user = await UserModel.findOneAndUpdate({_id: id}, userInput);
            return user;

        } catch (error) {

            throw error;

        }

    }

    public async deleteUser(id: string): Promise<UserDocument | null> {

        try {

            return await UserModel.findByIdAndDelete({_id: id});;

        } catch (error) {

            throw error;

        }

    }

    public generateToken (user: UserDocument): string {

        try {

            return jwt.sign({user_id: user.id, email: user.email}, process.env.JWT_SECRET || "secret", {expiresIn: "5m"});
            
        } catch (error) {
            
            throw error;

        }

    }

    public async findAll(): Promise<UserDocument[]> {
        
        try{

            const users = await UserModel.find();
            return users;  

        }catch(error){

            throw error;

        }

    }

    public async findById(id: string): Promise<UserDocument | null> {
        
        try {

            const user = await UserModel.findOne({_id: id});
            return user;

        } catch (error) {

            throw error;

        }

    }

    public async findByEmail(email : string): Promise<UserDocument | null> {

        try {

            const user = await UserModel.findOne({email: email});
            return user;

        } catch (error) {

            throw error;

        }

    }

    public async findAllByRol(rol : string): Promise<UserDocument[]> {

        try {

            const users = await UserModel.find({rol: rol.toLowerCase()});
            return users;

        } catch (error) {

            throw error;

        }

    }

}

export default new UserService();