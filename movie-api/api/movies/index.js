import movieModel from "./movieModel";
import asyncHandler from "express-async-handler";
import express from "express";
import {
  getMovies,
  getMovie,
  getMovieImages,
  getUpcomingMovies,
  getGenres,
  getLanguages,
  getLatestMovies,
  getMovieReviews,
  getTrend,
  getPeople,
  getPersonDetail,
  getCredits,
  getMovieCredits,
} from "../tmdb-api";
import { handleApiResponse } from "../../util/apiHandler/index.js";

const router = express.Router();

//Get movies
router.get(
  "/",
  asyncHandler(async (req, res) => {
    let { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
      movieModel.estimatedDocumentCount(),
      movieModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit),
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page)

    //construct return Object and insert into response object
    const returnObject = {
      page,
      total_pages,
      total_results,
      results,
    };
    res.status(200).json(returnObject);
  })
);

// Get movie details
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
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
  "/tmdb/movies",
  asyncHandler(async (req, res) => {
    await handleApiResponse(res, getMovies, "movies");
  })
);

router.get(
  "/tmdb/upcoming",
  asyncHandler(async (req, res) => {
    await handleApiResponse(res, getUpcomingMovies, "upcoming movies");
  })
);

router.get(
  "/tmdb/genres",
  asyncHandler(async (req, res) => {
    await handleApiResponse(res, getGenres, "genres infomation");
  })
);

router.get(
  "/tmdb/languages",
  asyncHandler(async (req, res) => {
    await handleApiResponse(res, getLanguages, "languages infomation");
  })
);

router.get(
  "/tmdb/now_playing",
  asyncHandler(async (req, res) => {
    await handleApiResponse(res, getLatestMovies, "latest movies infomation");
  })
);

router.get(
  "/tmdb/reviews/:id",
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

export default router;
