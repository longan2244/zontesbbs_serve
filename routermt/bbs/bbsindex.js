// ######方法#########
import ajax from "../../tool/index.js"
import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path"
import ffmpeg from "ffmpeg"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { imagePostAPI, makefriendsAPI, postReplyAPI, likeAPI, gettailAPI, getbbslistAPI, UserAPI, upUserAPI } from "../../api/bbs/bbsindex.js"
import { log } from "console";
// 获取论坛主页数据方法
export const getbbslist = async (req, res) => {
  // ###########前端访问路径    reply按照回复时间排序  time发帖时间排序
  //  ########### 路径必填  id必填

  // 获取地址 确定已什么方式返回数据##########################
  try {
    let sortType = req.params.sortType
    let data = await getbbslistAPI(req.user.accessToken, req.body.id, sortType)
    let last = data.BlogList.length - 1
    if (sortType == 'reply') {
      data.lastID = data.BlogList[last].CreateTime
    } else if (sortType == 'time') {
      data.lastID = data.BlogList[last].ID
    } else {
      return res.cc("路径错误,或为reply|time")
    }
    return res.send(data)
  } catch (error) {
    return res.cc('未知错误')
  }
}
// 获取个人资料（三合一）
export const User = async (req, res) => {
  // console.log(req.user);
  try {
    let data = await UserAPI(req.user.accessToken, req.body.pageCode, req.body.count, req.body.id)
    if (req.body.count == '2') {
      data.lastID = data.postList[data.postList.length - 1].ID
      return res.send(data)
    } else {
      return res.send(data)
    }
  } catch (error) {
    res.cc('未知错误', error)
  }
}
////修改论坛个人信息
export const upUser = async (req, res) => {
  try {
    let data = await upUserAPI(req.user.accessToken, req.body)
    return res.cc(data, 0)
  } catch (error) {
    res.cc('未知错误')
  }
}

// 根据帖子id查找帖子  根据帖子id查找评论 
export const gettail = async (req, res) => {
  try {
    // console.log(req.body);
    // 定义三合一
    const ROOT = [
      { jsonpCallback: 'detailNewCallback', method: 'detailNew' },// 根据帖子id查找帖子 
      { jsonpCallback: 'detailNewCommentCallback', method: 'detailNewComment' },// 根据帖子id查找评论 
      // { jsonpCallback: 'likeCmCallback', method: 'likeCm' },// 根据帖子id点赞 
    ]
    // console.log(ROOT[req.body.count]);
    let data = await gettailAPI(req.user.accessToken, ROOT[req.body.count], req.body)
    //如果是获取帖子评论 
    if (req.body.count == "1") {
      data.lastID = data.commentitem[data.commentitem.length - 1].ID
      return res.send(data)
    }
    return res.send(data)
  } catch (error) {
    return res.cc(error)
  }
}
//点赞
export const like = async (req, res) => {
  try {
    const ROOT = [
      { jsonpCallback: "likeOpusCallback", method: "likeOpus" },//对帖子点赞
      { jsonpCallback: "jsonpCallback", method: "likeCm" }//对评论点赞
    ]
    let data = await likeAPI(req.user.accessToken, ROOT[req.body.count], req.body)
    return res.send(data)
  } catch (error) {
    return res.cc(error)
  }
}

//回复帖子-评论
export const postReply = async (req, res) => {
  try {
    const TYPE = [
      { method: "comment" },//回复帖子
      { method: 'cmcomment' }]//回复评论
    let { data } = await postReplyAPI(req.user.accessToken, TYPE[req.body.type], req.body)
    return res.send(data)
  } catch (error) {
    return res.cc(error)
  }
}

//上传图片
export const makefriends = async (req, res) => {
  let TYPE = [
    { url: "/GX/Friend/", method: "publicUploadFileNew", type: "png" },//回复上传图片
    { url: "/GX/CardVideo/", method: "publicUploadFileNew", type: "mp4" },//上传视频
    { url: "/GX/Friend/", method: "publicUploadFileNew", type: "jpg" }//上传视频
  ]
  try {
    // req.body.imgdata
    // console.log(req.body);
    let { data } = await makefriendsAPI(req.user.accessToken, TYPE[req.body.type], req.body.imgdata)
    // console.log(data);
    return res.send(data)
  } catch (error) {
    return res.cc(error)
  }
}

//发布文章
export const imagePost = async (req, res) => {
  let TYPE = [
    { method: "saveAndroidDt" },//发布普通图片帖子//视频帖子
    // { method: "saveAndroidDt"},//视频帖子
  ]
  try {
    // req.body.imgdata
    let { data } = await imagePostAPI(req.user.accessToken, TYPE[req.body.type], req.body)
    return res.send(data)
  } catch (error) {
    return res.cc(error)
  }
}

//视频文件传送到node



