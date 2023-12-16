import asyncHandler from "express-async-handler";
import express from "express";
import genresModel from "./genresModel";

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier for the genre
 *         name:
 *           type: string
 *           description: Name of the genre
 */

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const genres = await genresModel.find();
    if (genres) {
      res.status(200).json(genres);
    } else {
      res.status(404).json({
        message: "The languages you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

export default router;
