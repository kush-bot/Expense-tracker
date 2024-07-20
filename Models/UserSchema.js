import mongoose from "mongoose";
import validator from 'validator';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:
    {
        type:String,
        required:[true,'Name is required']
    },
    email:
    {
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail,

    },
    password:
    {
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'password must be at least 6 characterts long'],
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },

    avatarImage: {
        type: String,
        default: ""
    },
    transaction:
    {
        type:[]
    },
    createdAt:
    {
        type:Date,
        default:Date.now,
    }
});

const User = mongoose.model('User',UserSchema);

export default User;