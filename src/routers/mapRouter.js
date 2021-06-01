import express from "express";

import { mapPrint, markerAdd } from "../controllers/mapController";

const mapRouter = express.Router();

mapRouter.get("/", mapPrint);
mapRouter.get("/add", markerAdd);

export default mapRouter;