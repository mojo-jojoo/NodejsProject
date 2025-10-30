import {asyncHandler} from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import ApiError from "../utils/ApiError.js"
import cloudinary from '../config/cloudinary.config.js';
import ApiResponse from '../utils/ApiResponse.js';



const registerUser= asyncHandler(async (req,res,next)=>{
    // steps break kro phle logic building k liye
    // 1. data collect kro req.body sai get user details from frontend but abhi front end nhi ha tou bdhao postman sai

    // 2. data validation kro like email valid ha ya nhi password emty tou nhi ha ? strong ha ya nhi etc (yeh sb hum model mein bhi kr skte hain mongoose k zariye)or yaha pr bhi dubhara validation kr skte hain
    // 3. check krna ha ki user already exist to nhi krta email ya username sai
    //4. model mein do file lyrhe hein wo check kro like check avatar etc 

    // 5. upload them to cloudinary aur get their urls  aur cloudinary k zariye upload krne k liye hume cloudinary ka sdk install krna prta ha npm i cloudinary

    // 6. user create krna ha database mein create user object using User model and save it to database 

    //7 remove password from response and refresh token field bhi remove krdo security k liye although wo encrypted hoga par phir bhi hum nhi bhejna chahte

    //8. check kro ki user create hua ya nhi agar hua to success response bhejo front end pr agar nhi hua to error bhejo


//1) userdetails collect kro req.body sai req sai sb miljata jb bhi body sai aata ha url sai diffrent hota ha to req.body bhi access kr skte hain
   const {fullName,username,email,password} = req.body;
   console.log("email",email);
   
//2) data validation kro
   if(!fullName || !username || !email || !password){
    return next(new ApiError("All fields are required",400));
   }

//3) check krna ha ki user already exist to nhi krta email ya username sai
   const existingUser = await User.findOne({$or: [{email},{username}]});
   if(existingUser){
    return next(new ApiError("User already exists with this email or username",400));
   }

//4) model mein do file lyrhe hein wo check kro like check images check avatar etc 
   // skipped for now as we are not handling files in this example  lkin dekho files ha tou handle kaise kaarni ha optionally nichy code dekho multer hmy files ka access dene k liye help krta ha hoskhta ha access ho hoskhta ha yh nhi 

   const avatarLocalPath = req.files?.avatar[0]?.path;//q k yh abhi server pr ha cloudinary pr nhi ha tou local path le rhy hein
   const coverPhotoLocalPath = req.files?.coverPhoto[0]?.path;

   if(!avatarLocalPath || !coverPhotoLocalPath){
    return next(new ApiError("Avatar and Cover Photo are required",400));
   }
   
//5) upload them to cloudinary aur get their urls 
 const avatar = await uploadOnCloudinary(avatarLocalPath);
 const coverPhoto = await uploadOnCloudinary(coverPhotoLocalPath);

 //avatar ko required field rkha ha meny ek dafa or check krlo gya ha yh nhi gya q k database phatyga agr nhi gya tou
   if(!avatar){
      return next(new ApiError("Avatar upload failed",500));
   }

//6) user create krna ha database mein create user object using User model and save it to database 
   const newUser = await User.create({
    fullName,
      username: username.toLowerCase(),
      email,
      password,
      avatar:{
        public_id: avatar.public_id,
        url: avatar.url
      },
      coverPhoto:{
        public_id: coverPhoto.public_id,
        url: coverPhoto.url
      }
   });   
   
   const userCreated = await newUser.findById(newUser._id).select("-password -refreshToken"); //7 remove password from response and refresh token field bhi remove krdo security k liye although wo encrypted hoga par phir bhi hum nhi bhejna chahte

   //8. check kro ki user create hua ya nhi agar hua to success response bhejo front end pr agar nhi hua to error bhejo
   if(!userCreated){
    return next (new ApiError("User registration failed",500));
   }
   
   return res.status(201).json(
      new ApiResponse(200,"User registered successfully",userCreated)
   );












})
export default registerUser;

