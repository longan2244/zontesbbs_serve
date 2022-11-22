import express from "express";
import { login } from "../routermt/login/login.js"
const router = express.Router()
//用户登录
router.post('/login', login)
export default router 