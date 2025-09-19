// import express from "express";
// import createError from "http-errors";
// import logger from "morgan";
// import cors from "cors";

// import itemsRouter from "./routes/items.js";
// import { errorHandler } from "./middlewares/errors.js";
// import db from "./db/index.js";

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(logger("dev"));
// app.use(express.json());

// app.use("/items", itemsRouter);
// import express from "express";
// import createError from "http-errors";
// import logger from "morgan";
// import cors from "cors";

// import itemsRouter from "./routes/items.js";
// import { errorHandler } from "./middlewares/errors.js";
// import db from "./db/index.js";

// const app = express();
// const port = process.env.PORT || 3000;

// // CORS設定を具体的に指定
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "http://localhost:3002",
//       "http://localhost:3003",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(logger("dev"));
// app.use(express.json());

// app.use("/items", itemsRouter);

// // 以下は同じ...

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.use(errorHandler);

// if (process.env.NODE_ENV === "development") {
//   const server = app.listen(port, () => {
//     console.log(`Server starts at http://localhost:${port}`);
//   });

//   process.on("SIGTERM", () => {
//     console.log("SIGTERM signal received: closing HTTP server");
//     server.close(async () => {
//       await db.end();
//       console.log("HTTP server closed");
//     });
//   });
// }

// console.log("env", process.env.NODE_ENV);

// export default app;
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import cors from "cors";

import itemsRouter from "./routes/items";
import toppingsRouter from "./routes/toppings";
import orderItemsRouter from "./routes/orderItem";
import orderRouter from "./routes/order";
import cartRouter from "./routes/cart";
import { errorHandler } from "./middlewares/errors";
import db from "./db/index";

const app = express();
const port = process.env.PORT || 8000;

// CORS設定
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["X-Total-Count"], // ページネーション用ヘッダー
  })
);

app.use(logger("dev"));
app.use(express.json());

app.use("/items", itemsRouter);
app.use("/topping", toppingsRouter);
app.use("/orderItems", orderItemsRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);

// ヘルスチェック
app.get("/health", (req, res) => {
  res.json({ message: "Curry API Server is running!" });
});

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

//console.log("env", process.env.NODE_ENV);

export default app;
