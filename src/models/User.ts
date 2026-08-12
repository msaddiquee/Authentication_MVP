import mongoose from "mongoose";
import bcrypt from "bcrypt";

type IUser = {
    name?: string,
    email: string,
    password: string,
}

type IUserMethods = {
    matchPassword(enteredPassword: string): Promise<boolean>,
}

type UserModel = mongoose.Model<IUser, object, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
    name: String,
    email: {type: String, unique: true, trim: true, lowercase: true, required: true},
    password: {type: String, trim: true, lowercase: true, required: true},
}, {versionKey: false});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);


