import Expense  from "../Models/ExpenseModel.js";
import User from '../Models/UserSchema.js';
import moment from "moment";

export const addExpense=async(req,res,next)=>{
    try{
        const {
            title,
            amount,
            description,
            date,
            category,
            userId,
            transactiontype,
        }=req.body;

        if(!title || !amount || !description || !date || !category || !userId ||!transactiontype ){
            return res.status(409).json({
                success:false,
                message:"fill all fields",
            });
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        let newExpense= await Expense.create({
            title:title,
            amount:amount,
            category:category,
            description:description,
            date:date,
            user:userId,
            transactionType:transactiontype
        });

        user.transaction.push(newExpense);
        user.save();

        return res.status(200).json({
            success:true,
            message:"Transaction added Succesfully",
        });
     }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}


export const getAllExpenses=async(req,res,next)=>{
    try{
        const {userId,type,frequency,startDate,endDate}=req.body;
        
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success:flase,
                message:"user not found",
            })
        }

        const query={
            user:userId,
        }

        if(type!=='all'){
            query.transactionType=type
        }

        if(frequency!=='custom'){
            query.date={
                $gt:moment().subtract(Number(frequency),"days").toDate()
            };

        }else if(startDate && endDate){
            query.date={
                $gte:moment(startDate).toDate(),
                $lte:moment(endDate).toDate(),
        };
        
    }

    const expenses = await Expense.find(query);
    return res.status(200).json({
        success:true,
        expenses:expenses
    });

}
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
}


export const deleteExpense=async(req,res,next)=>{
    try{
        const transactionId = req.params.id;
        const userId = req.body.id;

        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found",
            });
        }

        const expense = await Expense.findByIdAndDelete(transactionId);

        if(!expense){
            return res.status(400).json({
                success:false,
                message:"transaction not found"
            })
        }

        const transactionArr = user.transaction.filter((transaction)=>
            transaction._id===transactionId
    )
    user.transaction=transactionArr;
    user.save();

    return res.status(200).json({
        success:true,
        message:"transaction deleted successfully",
    });

    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

export const updateTransactionController = async (req, res) => {
    try {
      const transactionId = req.params.id;
  
      const { title, amount, description, date, category, transactionType } =
        req.body;
  
      console.log(title, amount, description, date, category, transactionType);
  
      const transactionElement = await Expenses.findById(transactionId);
  
      if (!transactionElement) {
        return res.status(400).json({
          success: false,
          message: "transaction not found",
        });
      }
  
      if (title) {
        transactionElement.title = title;
      }
  
      if (description) {
        transactionElement.description = description;
      }
  
      if (amount) {
        transactionElement.amount = amount;
      }
  
      if (category) {
        transactionElement.category = category;
      }
      if (transactionType) {
        transactionElement.transactionType = transactionType;
      }
  
      if (date) {
        transactionElement.date = date;
      }
  
      await transactionElement.save();
  
      // await transactionElement.remove();
  
      return res.status(200).json({
        success: true,
        message: `Transaction Updated Successfully`,
        transaction: transactionElement,
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        messages: err.message,
      });
    }
  };