//method 1  using try-catch

// const asyncHandler = (requestHandler) => async (err,req,res,next) => {
//     try {
//         await requestHandler(req, res, next);
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }



//method 2 using promise
const asyncHandler = (requestHandler) => {
    return (req,res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err)=> next(err))
    }
}

export {asyncHandler}