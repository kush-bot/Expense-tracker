import bcrypt from 'bcrypt';

import User from '../Models/UserSchema.js';


export const register=async(req,res,next)=>{
    try{
    const {username,email,password} = req.body;

    console.log(username,email,password);

    if(!username || !email || !password){
       return res.status(400).json({
            success:false,
            message:'All fields must be filled'
        });
    }
    let exists = await User.findOne({email});
    if(exists){
        return res.status(409).json({
            success:false,
            message:"User alreday exits"
        });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name:username,
        email,
        password:hashedPassword
    })

    return res.status(200).json({
        success:true,
        message:"Successfully created user",
        user:user
    });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
    
}


export const login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
           return res.status(400).json({
                success:false,
                message:"All fields must be filled"
            })
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not found"
            });
        }

        const match = await bcrypt.compare(password,user.password);

        if(!match){
            return res.status(401).json({
                success:false,
                message:"Incorrect email or password",
            })
        }

        delete user.password;

        return res.status(200).json({
            success:true,
            message:`welcome ${user.name}`,
        })



    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
export const setProfileIamge=async(req,res,next)=>{
try{
    const id = req.params.id;
    const imageData = req.body.image;

    const user = await User.findByIdAndUpdate(id,{
        isAvatarImageSet:true,
        avatarImage:imageData,
    },
    {new:true});
    return res.status(200).json({
        success:true,
        isSet:user.isAvatarImageSet,
        image:imageData
    });
    }
    catch(err){
        next(err);
    }
}

export const allUsers=async(req,res,next)=>{
    try{
        const user = await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarimage",
            "_id"
        ]);

        return res.json(user);
    }catch(err){
        next(err);
    }
}