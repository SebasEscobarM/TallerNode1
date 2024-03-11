import mongoose from "mongoose";

export interface UserInput {

    name: string;
    email: string;
    password: string;
    rol: string;

};

export interface UserDocument extends UserInput, mongoose.Document {

    createdAt: Date;
    updateAt: Date;
    deletedAt: Date;

};

const userSchema = new mongoose.Schema({

    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    rol: {type: String, required: true},

}, {timestamps: true, collectoin: "users"});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;