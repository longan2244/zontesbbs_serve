import axios from "axios";
import expjwt from "express-jwt";
import  express  from "express";
const ajax = axios.create({
  baseURL: 'https://m.zontes.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}) 

// // 设置请求拦截器
// ajax.interceptors.request.use(
//   config => {
//     // let Token = localStorage.getItem('Token')
//     // if (Token) {
//     //   config.headers.Authorization = Token
//     // }
//     console.log(expjwt.);
//     return config
//   }, error => {

//   }
// )


export default ajax