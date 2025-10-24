import { Request, Response, NextFunction } from 'express';
import express from 'express'


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
    console.log(name + email + password);
    
});

router.post('/signin', async(req: Request <{}, {}, SigninBody> , res: Response) => {

});

router.get('/content',(req, res) => {
    
});

router.post('/content',(req, res) => {

});


router.put('/content',(req, res) => {
    
});

router.delete('/content',(req, res) => {
    
});

router.post('/brain/share',(req, res) => {
    
});

router.get('/brain/:shareLink',(req, res) => {
    
});

router.delete('/brain/share',(req, res) => {
    
});


export default router;