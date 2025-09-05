import express from "express";
import createError from "http-errors";
import logger from "morgan";

import itemsRouter from "./routes/items.js";
import { errorHandler } from "./middlewares/errors.js";
import db from "./db/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());

app.use("/items", itemsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

if (process.env.NODE_ENV === "development") {
  const server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
  });
    
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(async () => {
      await db.end();
      console.log("HTTP server closed");
    });
  });
}

console.log('env', process.env.NODE_ENV);

export default app;
