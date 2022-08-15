import 'dotenv/config';
import express from "express";
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import path from 'path';
import { __dirname } from "./fs.js"

import "./src/config/db.config.js";
import api from './src/routes/api.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", api);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));