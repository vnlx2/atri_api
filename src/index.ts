import cors from 'cors';
import {config} from 'dotenv';
import express, {Express} from 'express';
import {routers} from './routes';
import {connect, set} from 'mongoose';
import bodyParser from 'body-parser';

async function connectToDatabase() {
  try {
    set('strictQuery', false);
    await connect(process.env.MONGODB_URI!);
    console.info('Database Connected');
  } catch (error) {
    console.log(error);
  }
}

function intializeServer() {
  // Declare express server and port
  const app: Express = express();
  const port = process.env.PORT;

  // Implement CORS, body parser and routers
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/api/v1', routers);

  // Start server
  app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
    console.info(`and live on ${new Date().toUTCString()}`);
  });
}

async function main() {
  config();
  console.info(`ATRI API Version ${process.env.VERSION}`);
  console.info('\nConnecting to database and initialize server\n');
  await connectToDatabase();
  intializeServer();
}

main();
