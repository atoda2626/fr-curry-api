// import { NextFunction, Request, Response } from "express";

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   res.status(500).send({ errors: [{ message: err.message }] });
// };

import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error caught by middleware:", err);

  // DB接続失敗
  if (err.code === "ECONNREFUSED") {
    return res
      .status(503)
      .json({ errors: [{ message: "Database connection failed" }] });
  }

  // 無効な入力（例: /items/abc で id に文字列渡した場合）
  if (err.code === "22P02") {
    return res
      .status(400)
      .json({ errors: [{ message: "Invalid input syntax" }] });
  }

  // デフォルト（その他エラー）
  res.status(err.status || 500).json({
    errors: [{ message: err.message || "Internal Server Error" }],
  });
};
