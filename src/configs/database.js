import mongoose from "mongoose";
import env from "dotenv";

env.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const db = mongoose.connection
    .on('error', (error) => console.error(error))
    .once('open', () => console.log('Database Connected'));