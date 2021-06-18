import express from "express";

import { mapPrint, showStory } from "../controllers/mapController";

const mapRouter = express.Router();

mapRouter.get("/", mapPrint);
mapRouter.get("/add", showStory);

export default mapRouter;