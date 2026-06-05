const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/generateToken");

async function adminAuth(req,res,next){
    try {
        const token = req.headers.cookie?.split('=')[1];
       
        if(!token){
            throw new AppError("Unauthorized: No token provided", 401);
        }
       const data  = await  verifyToken(token);
         if(data.role !== "SUPERADMIN"){
            throw new AppError("Unauthorized: Insufficient permissions", 403);
         }
         req.user = data;
         next();
    } catch (error) {
        next(error);
    }
}

module.exports = adminAuth;