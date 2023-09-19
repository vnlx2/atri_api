import cors from "cors";
import { config } from "dotenv";
import bodyParser from "body-parser";
import express, { Express } from "express";

config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', routers);

app.listen(port, () => {
    console.info(`ATRI API Version ${process.env.VERSION}`);
    console.info(`Server is running on port ${port}`);
});