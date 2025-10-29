// 

export const asyncHandler = (requestHandler)=> async (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch(next);
}

    



// try catch sai error handle kr rhe hain
// const asyncHandler =(fn) => async (req, res, next) => {
//     try{
//         await fn(req, res, next)

//     }catch(error){
//         res.status(err.code || 500).json({
//             success:false,
//             message:error.message || "Internal Server Error"
//         })
//         next(error)

//     }
    
// }
