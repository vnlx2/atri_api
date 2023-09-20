import {config} from 'dotenv';
import {connect, set} from 'mongoose';

config();

export const db = async () => {
  set('strictQuery', false);
  await connect(process.env.MONGODB_URI!);
  console.log('Database Connected');
}