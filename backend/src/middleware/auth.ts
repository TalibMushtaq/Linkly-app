import jwt from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';


interface JwtPayload {
    id : string;
}

declare module 'express-serve-static-core' {
  interface Request {
    userid?: string;
  }
}

export const userAuth = (req : Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Token is missing'})
    }
    
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        req.userid = decoded.id;
        next();
        return;
    } catch {
        return res.status(403).json({message: 'Verification failed'});
    }
}