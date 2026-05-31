const { prisma } = require("../../configs/database");
const AppError = require("../../utils/AppError");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/generateToken");

class AuthService {
    static async registerAdmin(req){
            const { name, email, contact, avatarUrl, password } = req;
            if(!name || !email || !contact || !password){
                throw new AppError("All fields are required", 400);
            }
            
            const existingAdmin = await prisma.superAdmin.findUnique({
                where: {
                    
                        email: email ,
                         contact: contact 
                    
                }
            });
            if(existingAdmin){
                throw new AppError("Admin with this email or contact already exists", 400);
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const data = await prisma.superAdmin.create({
                data:{
                    name,
                    email,
                    contact,
                    password: hashedPassword,
                }
            });
            
            return data;
    };

    // Implement the loginAdmin method
    static async loginAdmin(req){
        const {userId,password}= req;
        if(!userId || !password){
            throw new AppError("All fields are required", 400);
        }
        const emailLogin = await prisma.superAdmin.findUnique({
            where: {
                email: userId
            }
        });
        const contactLogin = await prisma.superAdmin.findUnique({
            where: {
                contact: userId
            }
        });
        const admin = emailLogin || contactLogin;
        if(!admin){
            throw new AppError("Admin not found", 404);
        }
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if(!isPasswordValid){
            throw new AppError("Invalid password", 401);
        }
        delete admin.password;
        
        return admin;
    }
};

module.exports = AuthService;