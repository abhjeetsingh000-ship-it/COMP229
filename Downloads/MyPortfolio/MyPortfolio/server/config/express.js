import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import contactRouter from "../routes/contact.js";
import projectRouter from "../routes/projects.js";
import qualRouter from "../routes/qualifications.js";
import userRouter from "../routes/users.js";
import authRouter from "../routes/auth.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/api/contacts", contactRouter);
app.use("/api/projects", projectRouter);
app.use("/api/qualifications", qualRouter);
app.use("/api/users", userRouter);
app.use('/api/auth', authRouter);

export default app;