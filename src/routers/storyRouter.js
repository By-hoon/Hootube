import express from "express";
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
  deleteStory,
} from "../controllers/storyController";
import { protectorMiddleware } from "../middlewares";

const storyRouter = express.Router();

storyRouter.get("/:id([0-9a-f]{24})", watch);
storyRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
storyRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deleteStory);
storyRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(postUpload);

export default storyRouter;