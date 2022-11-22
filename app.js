import express from "express";
import cors from "cors";
import router from "./router/login.js";
import itsMine from "./router/itsMine/userInformation.js"
import bbs from "./router/bbs/index/bbsindex.js"
import main from "./router/main/index.js";
import uploadmt from "./router/upload/index.js"
import expjwt from "express-jwt";
import config from "./config.js";
// import multer from "multer"//处理上传文件
// import path from "path";
// import fs from "fs"


const app = express();
app.use(cors())
//配置send中间件
app.use((req, res, next) => {

  res.cc = function (err, status = 1) {
    res.send(
      {
        status,
        message: err instanceof Error ? err.message : err,
      }
    )
  }

  next()
})
//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//一定要在路由之前配置token解析中间件 已及config配置文件
 
//({密码，排除不需要身份认证的地址})
app.use(expjwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api|images\//] }))
//路由模块
app.use('/api', router) 
app.use('/user', itsMine)
app.use('/images', express.static("./images"))
app.use('/home', main)
app.use('/bbs', bbs)
app.use('/uploadmt', uploadmt)    
// //生成ba64
// app.post('/api/upload', upload.single("pic"), (req, res) => {//中间件 upload.single("pic") 自带属性req.file
//   console.log(req.file);
//   let oldname = `./images/up/${req.file.filename}`
//   let newname = `./images/up/${req.file.originalname}`
//   fs.rename(oldname, newname, (err) => { //将二进制文件跟名
//     if (err) {
//       console.error(err)
//       return 
//     } else { 
//       console.log("改名成功");
//       let filePath = path.resolve('./images/up/' + req.file.originalname);//将文件转成ba64格式
//       let data = fs.readFileSync(filePath); 
//       data = new Buffer(data).toString('base64');
//       // let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
//       fs.writeFileSync(path.resolve(`./images/up/${req.file.originalname.split(".")[0]}.txt`), data);//在当前目录新建一个ba64.txt
//       res.send("ok")
//     }
//   })
// })
app.listen('5139', () => {
  console.log("监听");
})



//定义错误中间件
app.use((err, req, res, next) => {
  if (err.name == 'UnauthorizedError')
    return res.cc('身份验证失败')
})