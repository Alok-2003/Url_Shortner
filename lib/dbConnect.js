import mongoose from 'mongoose';

let isConnected = false;

export default async function connectMongo() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = connection.connections[0].readyState;
    console.log('MongoDB connected:', isConnected);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
