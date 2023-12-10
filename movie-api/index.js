import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import moviesRouter from "./api/movies";
import usersRouter from "./api/users";
import actorRouter from "./api/actors/index";
import tmdbMoviesRouter from "./services/movieService";
import "./db";
import authenticate from "./authenticate";
import defaultErrHandler from "./errHandler";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/movies", authenticate, moviesRouter);
app.use("/api/users", usersRouter);
app.use("/api/actors", actorRouter);
app.use("/tmdb", tmdbMoviesRouter);

app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
