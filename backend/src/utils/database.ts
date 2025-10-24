import mongoose from "mongoose";

export const connectDB = async (
  retries: number = 5,
  retryDelay: number = 5000,
  timeoutMs: number = 5000
) => {
  
  mongoose.connection.on('connected', () => 
    console.log('✅ MongoDB connected successfully.')
  );
  mongoose.connection.on('error', (err) => 
    console.error('❌ MongoDB connection error:', err)
  );
  mongoose.connection.on('disconnected', () => 
    console.log('🟡 MongoDB disconnected.')
  );

  let attemptsLeft = retries;

  while (attemptsLeft > 0) {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in your .env file.');
      }

      console.log(`Attempting to connect to MongoDB... (Attempt ${retries - attemptsLeft + 1}/${retries})`);
      
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: timeoutMs,
      });
      
      console.log('✅ Database connection established.');
      return;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Connection failed (${attemptsLeft - 1} retries left):`, errorMessage);
      
      attemptsLeft--;
      
      if (attemptsLeft > 0) {
        console.log(`⏳ Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise(res => setTimeout(res, retryDelay));
      } else {
        console.error('💀 Fatal: Could not connect to the database after multiple retries.');
        process.exit(1);
      }
    }
  }
};