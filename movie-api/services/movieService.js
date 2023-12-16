import express from "express";
import asyncHandler from "express-async-handler";
import {
  getMovies,
  getMovie,
  getMovieImages,
  getUpcomingMovies,
  getLatestMovies,
  getMovieReviews,
  getTrend,
  getPeople,
  getPersonDetail,
  getCredits,
  getMovieCredits,
} from "../api/tmdb-api.js";
import { handleApiResponse } from "../util/apiHandler/index.js";

const router = express.Router();

router.get(
  "/movies",
  asyncHandler(async (req, res) => {
    const page = req.query.page;
    await handleApiResponse(res, getMovies, "movies", page);
  })
);

router.get(
  "/movie/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({
        message: "The movie you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

router.get(
  "/movie/:id/images",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getMovieImages(id);
    if (images) {
      res.status(200).json(images);
    } else {
      res.status(404).json({
        message: "The images you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const page = req.query.page;
    await handleApiResponse(res, getUpcomingMovies, "upcoming movies", page);
  })
);

router.get(
  "/trend",
  asyncHandler(async (req, res) => {
    const page = req.query.page;

    await handleApiResponse(res, getTrend, "trend movies", page);
  })
);

router.get(
  "/now_playing",
  asyncHandler(async (req, res) => {
    const page = req.query.page;

    await handleApiResponse(
      res,
      getLatestMovies,
      "latest movies infomation",
      page
    );
  })
);

router.get(
  "/movie/:id/reviews",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const reviews = await getMovieReviews(id);
    if (reviews) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({
        message: "The reviews you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

router.get(
  "/people",
  asyncHandler(async (req, res) => {
    const page = req.query.page;

    await handleApiResponse(res, getPeople, "people infomation", page);
  })
);

router.get(
  "/person/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const person = await getPersonDetail(id);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({
        message: "The reviews you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

router.get(
  "/movie/:id/credits",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const credits = await getCredits(id);
    if (credits) {
      res.status(200).json(credits);
    } else {
      res.status(404).json({
        message: "The credits you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

router.get(
  "/person/:id/movie_credits",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie_credits = await getMovieCredits(id);
    if (movie_credits) {
      res.status(200).json(movie_credits);
    } else {
      res.status(404).json({
        message: "The credits you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

export default router;
