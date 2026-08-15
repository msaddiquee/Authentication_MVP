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
    password: {type: String, trim: true, required: true},
}, {versionKey: false});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);


