import { detailNews, followUsers, setPartnersCBs, getNBThreePackages, getInsuranceVehicleByUsers, shopcartlines, getShopCartDetails, Filtes, getUserInfoalls, getUserInfos } from "../../api/itsMine/userInformation.js"
// 获取用户基本资料
export const getUserInfo = async (req, res) => {
  console.log(req.user);
  //用户没登录的情况 
  if (!req.user.accessToken) {
    res.cc('请登录')
  }
  let data = await getUserInfos(req.user.accessToken)
  res.send({
    status: 0,
    msg: '获取成功',
    data
  })
}
//获取用户详情信息
export const getUserInfoall = async (req, res) => {
  let data = await getUserInfoalls(req.user.accessToken)
  return res.send({
    status: 0,
    msg: '获取成功',
    data,
  })
}
//获取用户联保资料
export const getInsuranceVehicleByUser = async (req, res) => {
  let data = await getInsuranceVehicleByUsers(req.user.accessToken)
  console.log(data);
  res.send(data)
}
// 废料
{
  // //修改获取真实名称
  // export const modifyTheName = async (req, res) => {
  //   console.log(req.body.name);
  //   let data = await modifyTheNames(req.user.accessToken, req.body.name)
  //   return res.send({
  //     status: 0,
  //     msg: '更换名称成功',
  //     data,
  //   })
  // }
  // //修改证件信息
  // export const Certificate = async (req, res) => {
  //   // console.log(req.body.province);//省
  //   // console.log(req.body.county);//市
  //   // console.log(req.body.city);//区县
  //   // console.log(req.body.type);//证件类型
  //   // console.log(req.body.code);//身份证号码
  //   // console.log(req.body.address);//详细地址
  //   // console.log(req.body.postcode);//邮政编码
  //   console.log(req.body);
  //   console.log(req.user.accessToken);
  //   // await Certificates(req.user)
  //   let data = await Certificates(req.user.accessToken, req.body)
  //   if (!data.result == 'sucess') return res.cc('获取失败')
  //   return res.send({
  //     status: 0,
  //     msg: '更新证件信息成功',
  //     data,
  //   })
  // }
  // //修改邮箱
  // export const modifyTheEmail = async (req, res) => {
  //   let data = await Filtes(req.params.id, req.user.accessToken, req.body)
  //   return res.send({
  //     status: 0,
  //     msg: '更换名称成功',
  //     data,
  //   })
  //   res.send('oka')
  // }
}
//封装修改用户信息
export const all = async (req, res) => {
  let data = await Filtes(
    req.params.id,
    req.user.accessToken,
    req.body)
  return res.send({
    status: 0,
    msg: '更新成功',
    data,
  })
}
//获取购物车
export const getShopCartDetail = async (req, res) => {
  let data = await getShopCartDetails(req.user.accessToken, req.body.address)
  return res.send({
    status: 0,
    msg: '获取成功',
    data,
  })
}
//增加减小商品数量
export const shopcartline = async (req, res) => {
  // console.log(req.user);
  let data = await shopcartlines(req.user.accessToken, req.body)
  return res.send({
    status: 0,
    msg: '获取成功',
    data,
  })
}
//查看未退旧件
export const getNBThreePackage = async (req, res) => {
  let data = await getNBThreePackages(req.user.accessToken)
  res.send(data)
}
// 结伴同行是否同意参与
export const setPartnersCB = async (req, res) => {
  let data = await setPartnersCBs(req.user.accessToken, req.body.issearch)
  res.send(data)
}
//刷取关注
export const followUser = async (req, res) => {
  // console.log(req.body);
  // res.send(req.body)
  let data = await followUsers(req.user.accessToken, req.body.followUserCode)
  // console.log(data.isFollow==0);
  try {
    if (data.isFollow == 0) {
      // console.log('重复');
      data = await followUsers(req.user.accessToken, req.body.followUserCode)
    }
  } catch (error) {
    return res.send(data)
  }
  return res.send(data)
}
//获取帖子是否存在
export const detailNew = async (req, res) => {
  let data = await detailNews(req.body.id)
  // console.log(data);
  try {
    return res.send({
      followUserCode: data.BlogDetail[0].AutherCode,
      status: 0,
      data,
    })
  } catch (error) {
  return  res.send({
      status: 1
    })
  }
}
// detailNew

//废弃项目
//修改绑定的手机号1-获取验证码  2-验证验证码并且保存
// export const getVerifyCode = async (req, res) => {
//   let data = await getVerifyCodes(req.user.accessToken)
//   console.log(data);
//   res.send(data)
// }




