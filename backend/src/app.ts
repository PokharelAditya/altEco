import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import userRouter from "./routes/user";
import loginRouter from "./routes/login";
import signupRouter from "./routes/signup";
import userPreferenceRouter from "./routes/userPreference";
import eco_scoreRouter from "./routes/eco_score";
import editProfileRouter from "./routes/editProfile";
import cookieParser from "cookie-parser";
import recommendRouter from "./routes/recommend";
import productRouter from "./routes/products";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(cookieParser());

app.use('/api', userRouter);
app.use('/api', loginRouter)
app.use('/api', signupRouter)
app.use('/api', userPreferenceRouter)
app.use('/api', editProfileRouter)
app.use('/api', productRouter)
app.use('/api', recommendRouter);
app.use('/api', eco_scoreRouter);
app.use((_req, _res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  res.status(statusCode).json({ error: errorMessage });
});

export default app;
