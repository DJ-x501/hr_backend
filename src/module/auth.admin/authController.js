const asyncHandler = require("../../utils/asyncHandler");
const { generateToken } = require("../../utils/generateToken");
const AuthService = require("./authService");

class AuthController {
    static registerAdmin = asyncHandler(async function(req,res,next){
        
        const response = await AuthService.registerAdmin(req.body);
        res.status(201).json({
            status: "success",
            message: "Admin registered successfully",
            data: response
        });

    });

    static loginAdmin = asyncHandler(async function(req,res,next){
        const response = await AuthService.loginAdmin(req.body);
        const token  =await generateToken({id:response.id,role:response.role});
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })
        res.status(200).json({
            status: "success",
            message: "Admin logged in successfully",
            data: response,
        });
    });
};


module.exports = AuthController;