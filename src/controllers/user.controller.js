import {asyncHandler} from '../utils/asyncHandler.js';



const registerUser= asyncHandler(async (req,res,next)=>{
    res.status(201).json({
        success:true,
        message:"User registered successfully"
    })
})
export default registerUser;

