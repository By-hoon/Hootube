import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteStory } from "../controllers/storyController";

const storyRouter = express.Router();

storyRouter.get("/:id([0-9a-f]{24})", watch);
storyRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
storyRouter.route("/:id([0-9a-f]{24})/delete").get(deleteStory);
storyRouter.route("/upload").get(getUpload).post(postUpload);

export default storyRouter;