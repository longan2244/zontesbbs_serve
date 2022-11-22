import express from "express";
// import { getUserInfo } from "../../routermt/itsMine/userInformation.js"
import { detailNew,followUser,setPartnersCB, getNBThreePackage,getInsuranceVehicleByUser,shopcartline,getShopCartDetail,all,getUserInfoall,getUserInfo } from "../../routermt/itsMine/userInformation.js"
const router = express.Router()
//获取用户基本信息需要token
router.get('/getUserInfo', getUserInfo)
router.get('/getUserInfoall', getUserInfoall)
// 修改用户信息
router.post('/updata/:id', all)
// 获取购物车列表
router.get('/shopmall', getShopCartDetail)
//增加或者是删除购物车数量
router.post('/shopcartline', shopcartline)
//获取联保信息
router.get('/getInsuranceVehicleByUser', getInsuranceVehicleByUser)
//查看未退旧件
router.get('/getNBThreePackage', getNBThreePackage)
// 结伴同行是否同意参与
router.post('/setPartnersCB', setPartnersCB)
//修改绑定的手机号1-获取验证码  2-验证验证码并且保存
// router.post('/getVerifyCode', getVerifyCode)
//刷取关注
router.post('/followUser', followUser)
//帖子存在？
router.post('/detailNew', detailNew)

export default router
// //修改用户真实名称
// router.post('/upmodifyTheName', modifyTheName)
// //修改证件信息
// router.post('/upCertificate', Certificate)
// //修改用户邮箱
// // router.post('/upEmail', modifyTheEmail)
// //修改qq

//获取用户详情信息
