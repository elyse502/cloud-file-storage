import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadFile, getFiles, deleteFile } from "../controllers/fileController.js";

const fileRouter = express.Router();

fileRouter.post('/upload', auth, upload.single('file'), uploadFile);
fileRouter.get('/', auth, getFiles);
fileRouter.delete('/:id', auth, deleteFile);

export default fileRouter;
