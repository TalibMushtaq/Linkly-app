import express from 'express';
import 'dotenv/config'; 
import { connectDB } from './utils/database';

import userRoute from './routes/user';
import contentRoute from './routes/content';
import SharedContent from './routes/SharedContent';



const app = express();
app.use(express.json());

app.use('/api/user', userRoute);   // -Handles login, signup, etc.
app.use('/api/v1', contentRoute);  // -Handles post, put, delete, get content
app.use('/api/v2', SharedContent);    // -Handles post, get, delete shared links/content



const startServer = async () => {
  try {
    await connectDB(); // <- connect to database 
    
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


startServer(); // <- start the sever 