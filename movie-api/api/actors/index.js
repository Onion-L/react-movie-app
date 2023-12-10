import actorModel from "./actorModel";
import asyncHandler from "express-async-handler";
import express from "express";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const actors = await actorModel.find();
    res.status(200).json(actors);
  })
);

export default router;
