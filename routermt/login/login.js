import md5 from "md5"
//导入bcryptjs
import bcrypt from "bcryptjs"
import config from "../../config.js"
//导入生成token 的包 
import jsonwebtoken from "jsonwebtoken"
// import  { tokentime } from "../../config.js"

import { logins } from "../../api/login/index.js"
//用户登录
export const login = async (req, res) => {
  let pwd = md5(req.body.pwd) // 加密pwd 
  let obj = {
    jsonpCallback: 'logincallback',
    ...req.body,
    pwd,
  }
  let Data = await logins(obj)
  console.log(Data);
  if (Data.isLogin == 'False') {
    return res.send(Data)
  }
  // 成功登陆
  let user = { ...Data }
  //对用户信息加密，生成token字符串 （用户对象   秘钥   过期时间）
  let tokenStr = jsonwebtoken.sign(user, config.jwtSecretKey, { expiresIn: config.tokentime })
  return res.send({
    status: 0,
    msg: '成功获取token',
    Nodetoken: 'Bearer ' + tokenStr,
      data: { ...Data }
  })
}





