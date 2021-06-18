import express from "express";
import { registerView, createComment } from "../controllers/storyController";

const apiRouter = express.Router();

apiRouter.post("/stories/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/stories/:id([0-9a-f]{24})/comment", createComment);

export default apiRouter;