import { Request, Response, NextFunction } from 'express';
import express from 'express'
import bcrypt from 'bcrypt'
import  jwt, { Secret } from 'jsonwebtoken';

const router = express.Router();


router.use((err : Error, req: Request, res : Response, next: NextFunction) => {
    console.error('user-Router-Level Error',err);
    res.status(500).json({
        success: false,
        message: 'Router error: ' + err.message
    });
    
})

interface SignupBody {
    name : string;
    email: string 
    password : string;
}

interface SigninBody {
    name : string,
    email : string
}

router.post('/signup', async(req: Request < {}, {}, SignupBody>, res: Response) => {
    const {name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,10) //hashing the pasword

    console.log(name + email + password);
    
});

router.post('/signin', async(req: Request <{}, {}, SigninBody> , res: Response) => {

});


export default router;