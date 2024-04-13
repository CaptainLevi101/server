import bcrypt from 'bcrypt';import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import axios from 'axios';
import User from '../models/User.js'
import cloudinaryT from '../utils/cloudinaryT.js';


export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: 'Password incorrect' });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
        return res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const registerController = async (req, res) => {
    const { profileImage, email, password, firstName, lastName } = req.body;
        
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
       
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(password, salt);
        const resultantImage=await cloudinaryT.uploader.upload(profileImage,{
            upload_preset:"faifuxkk"
        });
        

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath:resultantImage.secure_url
        })
        //save the new user
        await newUser.save();
        // const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        // console.log(result);
        return res.status(200).json({ message:'user created successfully',User:newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed',error: error.message });
    }
};


export const fetchImageController=async(req,res)=>{
    try{    
       
        const id=req.params.id;
        const userKun=await User.findById(id);
        const response = await axios.get(userKun.profileImagePath, { responseType: 'arraybuffer' });
        // console.log(response);
        return res.status(200).json({image:id})

    }catch(err){
        console.log(err);
    }
}
