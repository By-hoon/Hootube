import express from "express";
import { trending } from "../controllers/mapController";

const mapRouter = express.Router();

mapRouter.get("/", trending);

export default mapRouter;