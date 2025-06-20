import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { 
        firstName,
        lastName,
        role,
        email,
        phone,
        dob,
        password,
        nic,
        gender,
    } = req.body;
    if (
        !firstName ||
        !lastName || 
        !role ||
        !email ||
        !phone ||
        !dob ||
        !password ||
        !nic ||
        !gender 
        ){
           return next(new ErrorHandler("Please fill in all required details", 400));

        }
        let user = await User.findOne({email});
        if(user){
            return next(new ErrorHandler("User Already Registered",400))
        }
        user = await User.create({firstName,
        lastName,
        role,
        email,
        phone,
        dob,
        password,
        nic,
        gender,
    });
   generateToken(user,"User Registered",200,res);
}) 

export const login = catchAsyncErrors(async(req,res,next)=>{
    const{email, password, confirmPassword,role}=req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please fill in all required details ",400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password do not match",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email",400))
    }
     const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User Not Found With This Role!", 400));
  } 
  generateToken(user,"User Login Successfully",200,res);
});

export const addNewAdmin = catchAsyncErrors(async(req,res,next)=>{
    const { 
        firstName,
        lastName,
        email,
        phone,
        dob,
        password,
        nic,
        gender,
        
    } = req.body;
     if (
        !firstName ||
        !lastName || 
        
        !email ||
        !phone ||
        !dob ||
        !password ||
        !nic ||
        !gender 
        ){
           return next(new ErrorHandler("Please fill in all required details", 400));
        }
        const isRegistered = await User.findOne({email});
        if(isRegistered){
            return next(new ErrorHandler(`${isRegistered.role} with this email already Exits`))
        }
        const admin = await User.create({
        firstName,
        lastName,
        role: "Admin",
        email,
        phone,
        dob,
        password,
        nic,
        gender,
    });
    res.status(200).json({
        success: true,
        message:"New Admin Registered",
    });
})

export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        sucess: true,
        doctors,
    });
});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Admin Log Out Successfully",
    })
})

export const logoutPatient = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Patient Log Out Successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
}
const {
    firstName,
        lastName,
        email,
        phone,
        dob,
        password,
        nic,
        gender,
        doctorDepartment
        } =req.body;

         if (
        !firstName ||
        !lastName || 
        !email ||
        !phone ||
        !dob ||
        !password ||
        !nic ||
        !gender ||
        !doctorDepartment
        ){
            return next(new ErrorHandler("Please Provide Full Details",400));
        }
        const isRegistered = await User.findOne({email});
        if(isRegistered){
             return next(new ErrorHandler(`${isRegistered.role}Already Registered with this email` ,400));
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
            docAvatar.tempFilePath
        );
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.error("Cloudinary Error",cloudinaryResponse.error ||"Unknown Cloudinary Error");
        }
        const doctor = await User.create({
        firstName,
        lastName,
        role: "Doctor",
        email,
        phone,
        dob,
        password,
        nic,
        gender,
        doctorDepartment,
        docAvatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        });
        res.status(200).json({
            success: true,
            message: "New Doctor Registered",
            doctor
        });
});