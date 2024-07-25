import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { createServer as createHttpServer } from "http";

import Logger from "./util/logger.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const http = createHttpServer(app);

http.listen(process.env.HTTP_PORT, () => {
  Logger.out([
    `${process.env.APP_NAME} is listening on port ${process.env.HTTP_PORT}`,
  ]);
});

export { app };
