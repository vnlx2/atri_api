import express from 'express';
import { db } from './src/configs/database.js';
import dotenv from 'dotenv';
import birthdayRouter from './src/routes/birthday.js';
import userRouter from './src/routes/user.js';
import authRouter from './src/routes/auth.js';
import vnRouter from './src/routes/visualNovel.js';
import fanTLTeamRouter from './src/routes/fanTLTeam.js';

dotenv.config();
const app = express();
const port = 8016;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.APP_DEBUG == "true" ? 
    'http://localhost:5173' : 'https://atri-bot.vnlx.org'); 
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json());

// Route Grouping
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/birthday', birthdayRouter);
app.use('/api/v1/visualnovel', vnRouter);
app.use('/api/v1/fantl', fanTLTeamRouter);


app.listen(port, () => {
    console.log('ATRI Web Started');
});