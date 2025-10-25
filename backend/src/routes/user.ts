import { Request, Response, NextFunction } from 'express';
import express from 'express'
import bcrypt from 'bcrypt'
import { UserModel } from '@/model/userModel';

const router = express.Router();


interface SignupBody {
    username : string,
    fullname : string;
    email: string 
    password : string;
}


router.post('/signup', async(req: Request < {}, {}, SignupBody>, res: Response) => {
    const {username,fullname, email, password } = req.body;
    try {
        const existingUser = await UserModel.exists({email});

        if (existingUser) {
            return res.status(409).json({
                message: "User Already Exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10) //hashing the pasword

        await UserModel.create({
            username,
            fullname,
            email,
            password : hashedPassword
        });

        return res.status(201).json({
            message : "User Created Successfully"
        });
    } catch (error) {
        console.error("signup error :", error);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
});

// router.post('/signin', async(req: Request <{}, {}, SigninBody> , res: Response) => {

// });




router.use((err : Error, _req: Request, res : Response, _next: NextFunction) => {
    console.error('user-Router-Level Error',err);
    res.status(500).json({
        success: false,
        message: 'Router error: ' + err.message
    });
    
})

export default router;