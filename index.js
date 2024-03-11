import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import destinationRoute from './routes/destination.js';
import city from './routes/city.js';
import Country from './routes/country.js';
import authRoutes from './routes/auth.js';
import state from './routes/state.js';
const app = express();
dotenv.config();

const port = process.env.PORT || 1234;

// Database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/destination', destinationRoute);
app.use('/auth', authRoutes);
app.use('/city', city);

app.use('/country', Country);
app.use('/state',state);
app.listen(port, () => {
    connect();
    console.log('Server listening on port', port);
});
