import express from "express";
import multer from "multer"//处理上传文件
import { upload } from "../../routermt/upload/index.js"
const router = express.Router()
const uploadFile = multer({ dest: './images/up' });
router.post("/mp4", uploadFile.single("mp4"), upload)//前端要设置mp4:文件

export default router