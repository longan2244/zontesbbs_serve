import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ajax from "../../tool/index.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from "path"
import fs from "fs"  
//视频转地址
export const demoAPI = (ba64) => {
  try {
    return ajax({
      method: 'post',
      url: "/ashx/makefriends/userinfo.ashx",
      data: {
        method: "publicUploadFileNew",
        url: "/GX/CardVideo/",
        imgdata: ba64,
        type: "mp4",
      }
    })
  } catch (error) {
      
  }
}