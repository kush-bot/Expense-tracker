import mongoose from 'mongoose';
import User from './UserSchema.js';

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    title:
    {
        type:String,
        required:true,
        trim:true,
    },
    amount:
    {
        type:Number,
        required:[true,"amount is required"],
        default:0,
    },
    category:
    {
        type:String,
        required:[true,"category is requird"],

    },
    description:
    {
        type:String,
        required:[true,"Description is required"],

    },
    transactionType:
    {
        type:String,
        required:[true,"transaction type is required"],
    },
    date:{
        type:Date,
        required:[true,"Date is required"],
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    },

    createdAt:
    {
        type:Date,
        default:new Date(),
    }

});

const Expense = mongoose.model("Expense",ExpenseSchema);

export default Expense;