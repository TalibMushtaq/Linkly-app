import express from 'express';
import { connectDB } from './utils/database';

import userRoute from './routes/user';
import contentRoute from './routes/content';
import LinksRoute from './routes/Links'

const app = express()

app.use('/api/user',userRoute);
app.use('/api/v1', contentRoute);
app.use('/api/v2', LinksRoute);



const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = 5000;
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};


startServer();