import path, { resolve } from "path"
import fs from "fs"
import { demoAPI } from "../../api/uplode/index.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { log } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const upload = async (req, res) => {
  try {
    //视频放到目录 
    let ba64txturl = await infile(req)//ba64文件地址
    let ba64 = await ba64urltoba64(ba64txturl) //读取BA64
    let { data } = await demoAPI(ba64)//提交视频转换链接
    //删除源文件
    await deleteDir(path.resolve(__dirname, "../../images/up"));
    //创建文佳佳
    mkdirSync(path.resolve(__dirname, "../../images/up"), () => {
    })
    res.send(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 视频放到目录bingqi返回地址
function infile(req) {
  try {
    return new Promise((resolve, reject) => {
      // console.log("正在处理");
      let url = path.resolve(__dirname, "../../images/up") + "/"
      // let url = path.resolve(__dirname, "../../images/up")
      let oldname = `${url}${req.file.filename}`//获取加密文件名 
      let newname = `${url}${req.file.originalname}`//获取文件本身文件名
      fs.rename(oldname, newname, (err) => { //将二进制文件重命名
        if (err) {
          console.error(err)
          return
        } else {
          let filePath = path.resolve(url + req.file.originalname);//将文件转成ba64格式
          let data = fs.readFileSync(filePath);
          data = new Buffer(data).toString('base64');
          // let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
          fs.writeFileSync(path.resolve(`${url}${req.file.originalname.split(".")[0]}.txt`), data);//在当前目录新建一个ba64.txt
          resolve(path.resolve(`${url}${req.file.originalname.split(".")[0]}.txt`))
        }
      })
    })
  } catch (error) {

  }
}

function ba64urltoba64(ba64txturl) {
  try {
    return new Promise((resolve, reject) => {
      fs.readFile(ba64txturl, 'utf-8', function (err, data) {
        if (err) {
          reject(err)
        }
        resolve(data.toString())
      })
    })
  } catch (error) {

  }
}


/**
 * 删除文件夹功能
 * @param  {String} url  文件路径，绝对路径
 * @return {Null}   
 * @author huangh 20170123
 */
function deleteDir(url) {
  var files = [];
  if (fs.existsSync(url)) {  //判断给定的路径是否存在

    files = fs.readdirSync(url);   //返回文件和子目录的数组
    files.forEach(function (file, index) {
      var curPath = path.join(url, file);

      if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);    //是指定文件，则删除
      }

    });

    fs.rmdirSync(url); //清除文件夹
  } else {
    console.log("给定的路径不存在！");
  }

}

/**
 * 创建文件夹
 */
function mkdirSync(dir, cb) {
  let paths = dir.split('/');
  let index = 1;
  function next(index) {
    //递归结束判断
    if (index > paths.length) return cb();
    let newPath = paths.slice(0, index).join('/');
    fs.access(newPath, function (err) {
      if (err) {//如果文件不存在，就创建这个文件
        fs.mkdir(newPath, function (err) {
          next(index + 1);
        });
      } else {
        //如果这个文件已经存在，就进入下一个循环
        next(index + 1);
      }
    })
  }
  next(index);
}

