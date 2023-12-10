import reviewModel from "./reviewModel";
import asyncHandler from "express-async-handler";
import express from "express";
import { handleApiResponse } from "../../util/apiHandler";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reivews = await reviewModel.find();
    if (reivews) {
      res.status(200).json(reivews);
    } else {
      res.status(404).json({
        message: "The reivews you requested could not be found.",
        status_code: 404,
      });
    }
  })
);

export default router;
