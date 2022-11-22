import express from "express";
import { getProductCar } from "../../routermt/main/index.js"
const router = express.Router()
//获取摩托车商品列表
router.get('/main', getProductCar)
export default router