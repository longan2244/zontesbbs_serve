// ######路由#########
import express from "express";
// const formidable = require('formidable');

//导入方法
import { imagePost,makefriends,postReply,like,gettail,upUser, getbbslist, User } from "../../../routermt/bbs/bbsindex.js"
const router = express.Router()
//获取论坛主页数据
router.post('/Bbs/:sortType', getbbslist)
router.post('/getUser', User)
router.post('/upUser', upUser)
router.post('/gettail', gettail)
router.post('/like', like)
router.post('/postReply', postReply)
router.post('/makefriends', makefriends)
router.post("/imagePost", imagePost)
// router.post("/demo", demo)
//图片ba64转地址

export default router