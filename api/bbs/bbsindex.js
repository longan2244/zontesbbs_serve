// #################API############
import ajax from "../../tool/index.js"

import { jsonpToJsonV2 } from "../../tool/jsptojson.js"
// 获取论坛主页数据API
//############API##############
export const getbbslistAPI = (ACCESSTOKEN, id, sortType) => {
  try {
    let jsonpCallback = "forumIndexCallback"
    return ajax({
      method: 'post',
      url: "/ashx/moments/forumListData.ashx",
      data: {
        jsonpCallback,
        method: "forumIndex",
        // id: 0,
        sortType: sortType,
        id,
        ACCESSTOKEN,
      }
    }).then(resolve => {
      // return jsonpToJsonV2(resolve)
      return jsonpToJsonV2(resolve.data, jsonpCallback);
    }).catch()
  } catch (error) {
    return error.message
  }
}

// 根据帖子id查找帖子  根据帖子id查找评论  

export const gettailAPI = (ACCESSTOKEN, count, data) => {
  try {
    let obj = {}

    //如果是获取帖子评论时候没有带参数 给予首页
    if (count.jsonpCallback == "detailNewCommentCallback" && data.cmid == null) {
      obj.cmid = "0"
    }
    return ajax({
      method: 'post',
      url: "/rbook/dongtai.ashx",
      data: {
        ...data,
        ...count,
        ...obj,
      }
    }).then(resolve => {
      return jsonpToJsonV2(resolve.data, count.jsonpCallback)
    }).catch()
  } catch (error) {
    return error.message
  }
}

//对评论或者是帖子点赞
export const likeAPI = (ACCESSTOKEN, count, data) => {
  try {
    return ajax({
      method: 'post',
      url: '/rbook/dongtai.ashx',
      data: {
        ...count,
        ACCESSTOKEN,
        ...data,
      }
    }).then(resolve => {
      return jsonpToJsonV2(resolve.data, count.jsonpCallback)
    }).catch()
  } catch (error) {
    return error.message
  }
}
//帖子回复相关 
export const postReplyAPI = (ACCESSTOKEN, type, data) => {
  try {
    return ajax({
      method: 'post',
      url: '/rbook/dongtai.ashx',
      data: {
        ...type,
        ACCESSTOKEN,
        ...data,
      }
    }).catch()
  } catch (error) {
    return error
  }
}

// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUQVlPIE1JUyIsImlhdCI6MTY2ODE1MTc1NCwiZXhwIjoxNjc1OTI3NzU0LCJhdWQiOiJodHRwczovL21zbS56b250ZXMuY29tIiwic3ViIjoiQWxsIFVzZXJzIiwianRpIjoiMjAyMjExMTEwMzI5MTQ1MTEiLCJ1c2VySWQiOiJaMjAyMTA2MjEwMDQ5IiwidXNlck5hbWUiOiIxNTc1NjI0MjM5MiIsInVzZXJSb2xlIjoibWVtYmVyVmlwIn0.xmGse108UK4yVWPEXMCqizbGAwVm6EcHToc - mZb--rg
//发布帖子
export const imagePostAPI = (ACCESSTOKEN, type, body) => {
  // console.log(...type);
  return ajax({
    method: 'post',
    url: "/rbook/dongtai.ashx",
    data: {
      ACCESSTOKEN,
      ...type,
      ...body
    }
  })
}
// 获取个人资料（三合一）
export const UserAPI = (ACCESSTOKEN, pageCode, count, id) => {
  try {
    const ROOT = [
      { jsonpCallback: "userInfoCallback", method: 'userInfo' },//用户资料
      { jsonpCallback: "getMotorInfo", method: 'getMotorInfo' },//用户摩托车型号
      { jsonpCallback: "infoMotoMsgCallback", method: 'infoMotoMsg' }, //用户的帖子
    ]
    let obj = {}
    if (count == "2") {
      obj.id = id | 0//默认0显示首页
    } else { }
    const jsonpCallback = ROOT[count].jsonpCallback
    return ajax({
      method: 'post',
      url: '/ashx/moments/userHomePage.ashx',
      data: {
        jsonpCallback: ROOT[count].jsonpCallback,
        method: ROOT[count].method,
        ...obj,
        pageCode,
        ACCESSTOKEN,
      }
    }).then(resolve => {
      // console.log(resolve.data);
      // console.log(jsonpCallback);
      return jsonpToJsonV2(resolve.data, jsonpCallback)
    })
  } catch (error) {
    // console.log(error);
    return error
  }
}
//修改论坛个人信息
export const upUserAPI = (ACCESSTOKEN, data) => {
  try {
    // console.log(data);
    let jsonpCallback = "updateSignCallback"
    return ajax({
      method: 'post',
      url: '/rbook/dongtai.ashx',
      data: {
        ...data,
        jsonpCallback,
        method: "updateSign",
        ACCESSTOKEN
      }
    }).then(resolve => {
      return jsonpToJsonV2(resolve.data, jsonpCallback)
    }).catch()
  } catch (error) {
    return error.message
  }
}
//图片视频转地址
export const makefriendsAPI = (ACCESSTOKEN, type, imgdata) => {
  try {
    return ajax({
      method: 'post',
      url: "/ashx/makefriends/userinfo.ashx",
        headers: {
          "Accept": "*/*",
          "Cookie": "Cookie_6=value; IsLogin=False; IsTayo=False; TOKEN-STATUS=NO-TOKEN; Token-Exp-Time=",
          "Content-Type": "application/x-www-form-urlencoded"
        },
      data: {
        imgdata,
        ...type,
        // ACCESSTOKEN,
      }
    }).catch(error => {
      return Promise.reject(error)
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

//视频文件传送到node
