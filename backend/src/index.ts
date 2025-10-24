import express from 'express'





import userRoute from './routes/user'

const app = express()

app.use('/api/user',userRoute);