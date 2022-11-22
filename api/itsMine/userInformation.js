import ajax from "../../tool/index.js"
import { jsonpToJson } from "../../tool/jsptojson.js"
// 请求基本信息
export const getUserInfos = (ACCESSTOKEN) => {
  return ajax({
    method: 'post',
    url: '/ashx/usercenter/shmall/UserInfo.ashx',
    data: {
      jsonpCallback: "getUserInfoCB",
      ACCESSTOKEN,
      method: 'getInfo'
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}
//请求详情信息
export const getUserInfoalls = (ACCESSTOKEN) => {
  return ajax({
    method: 'post',
    url: '/ashx/usercenter/shmall/UserInfo.ashx',
    data: {
      jsonpCallback: "jsonpCallback",
      ACCESSTOKEN,
      method: 'info'
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}
//请求购物车列表
export const getShopCartDetails = (ACCESSTOKEN,address) => {
  // 可选值
  if (!address) {
    address=''
  }
  return ajax({
    method: 'post',
    url: '/ashx/shopmall/order/Order.ashx',
    data: {
      ACCESSTOKEN,
      method: 'getShopCartDetail',
      address,
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}
//请求增加购物车
export const shopcartlines = (ACCESSTOKEN, data) => {
  // 可选值
  // if (!address) {
  //   address = ''
  // }
  return ajax({
    method: 'post',
    url: '/ashx/shopmall/order/Order.ashx',
    data: {
      ...data,
      ACCESSTOKEN,
      methodtype:0,//方法类型我也不知道这是什么
      method: 'shopcartline',
      // itemcode,//商品id
      // acttype,// add为加 jian为减
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}
// 封装修改用户信息
export const Filtes = (id, ACCESSTOKEN, data) => {
  return ajax({
    method: 'post',
    url: '/ashx/usercenter/shmall/UserInfo.ashx',
    data: {
      jsonpCallback: "saveInfoCallBack",
      ACCESSTOKEN,
      method: 'updateInfo',
      ...data,
      act: id
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
} 
//获取用户联保资料
export const getInsuranceVehicleByUsers = (ACCESSTOKEN) => { 
  return ajax({
    method: 'post',
    url: '/ashx/usercenter/shmall/UserInfo.ashx',
    data: {
      method:"getInsuranceVehicleByUser",
      jsonpCallback: "getInsuranceVehicleCallBack",
      ACCESSTOKEN,
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}
//获取未退旧件
export const getNBThreePackages = (ACCESSTOKEN) => {
  return ajax({
    method: 'post',
    url: '/ashx/usercenter/shmall/UserInfo.ashx',
    data: {
      method: "GetNBThreePackages",
      jsonpCallback: "GetNBThreePackagesCB",
      ACCESSTOKEN,
      act:'list'
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}
// 结伴同行是否同意参与
export const setPartnersCBs = (ACCESSTOKEN, issearch) => {
  // console.log(ACCESSTOKEN);
  return ajax({
    method: 'post',
    url: '/ashx/usercenter/shmall/UserInfo.ashx',
    data: {
      method: "updateInfo",
      jsonpCallback: "setPartnersCB",
      ACCESSTOKEN,
      act: 'setPartner',
      issearch,
    }
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}

// //刷取关注
export const followUsers = (ACCESSTOKEN, followUserCode) => {
  // console.log(ACCESSTOKEN);
      try {
        return ajax({
          method: 'post',
          url: '/ashx/moments/follow.ashx',
          data: {
            method: "followUser",
            jsonpCallback: "followUserCallback",
            ACCESSTOKEN,
            followUserCode,
          }
        }).then(resolve => {
          return jsonpToJson(resolve.data)
        }).catch(err => {
          console.log(err);
        })
      } catch (error) {
        
      }
}
//获取贴子是否存在
export const detailNews = (id) => {
      try {
        return ajax({
          method: 'post',
          url: "/rbook/dongtai.ashx",
          data: {
            jsonpCallback: "detailNewCallback",
            method: 'detailNew',
            id,
            ACCESSTOKEN: ''
          }
        }).then(resolve => {
          return jsonpToJson(resolve.data)
        }).catch(err => {
            console.log(err);
        })
      } catch (error) {
        
      }
}

// 废弃不做（不要删除）
// {
//   //修改绑定的手机号1-获取验证码  2-验证验证码并且保存
//   export const getVerifyCodes = (ACCESSTOKEN) => {

//     // console.log(ACCESSTOKEN);
//     return ajax({
//       method: 'post',
//       url: '/ashx/usercenter/shmall/UserInfo.ashx',
//       data: {
//         method: "getVerifyCode",
//         jsonpCallback: "getMessCodeCB",
//         ACCESSTOKEN,
//         act: 'getMessCode',
//       }
//     }).then(resolve => {
//       // let o = 'set-cookie'
//       // console.log(resolve.headers);
//       let str = JSON.stringify(resolve.headers);
//       // str = JSON.stringify(str)
//       // let o = str
//       let imgyzm = str.split("MessCode=")[1].split("=")[0].split(';')[0]
//       return {
//         mt: jsonpToJson(resolve.data),
//         imgyzm: imgyzm
//       }
//     }).then(async resolve => {
//       console.log(resolve.imgyzm);
//       // let datas= await ajax(
//       //   {
//       //     method: 'post',
//       //     url: '/ashx/usercenter/shmall/UserInfo.ashx',
//       //     data: {
//       //       Tel:'18181427197',
//       //       method: "getVerifyCode",
//       //       jsonpCallback: "getnewTelCodeCB",
//       //       ACCESSTOKEN,
//       //       messvalicode: resolve.imgyzm,
//       //       act: 'editnewtel',
//       //     }
//       //   }
//       // )
//       // console.log(datas);
//     })
//   }
// }




// //请求修改名称信息
// export const modifyTheNames = (ACCESSTOKEN, name) => {
//   return ajax({
//     method: 'post',
//     url: '/ashx/usercenter/shmall/UserInfo.ashx',
//     data: {
//       jsonpCallback: "saveInfoCallBack",
//       ACCESSTOKEN,
//       method: 'updateInfo',
//       name,
//       act: 'Name'
//     }
//   }).then(resolve => {
//     return jsonpToJson(resolve.data)
//   })
// }
// //请求修改证件信息
// export const Certificates = (ACCESSTOKEN, updata) => {
  
//   return ajax({
//     method: 'post',
//     url: '/ashx/usercenter/shmall/UserInfo.ashx',
//     data: {
//       method: 'updateInfo',
//       act: 'Certificate',
//       ACCESSTOKEN,
//       ...updata,
//     }
//   }).then(resolve => {
//     console.log(resolve.data);
//     return jsonpToJson(resolve.data)
//   })
// }
// //请求修改邮箱
// export const modifyTheEmails = (ACCESSTOKEN, email) => {
//   return ajax({
//     method: 'post',
//     url: '/ashx/usercenter/shmall/UserInfo.ashx',
//     data: {
//       jsonpCallback: "saveInfoCallBack",
//       ACCESSTOKEN,
//       method: 'updateInfo',
//       email,
//       act: 'Email'
//     }
//   }).then(resolve => {
//     return jsonpToJson(resolve.data)
//   })
// }
// //修改qq号
// export const modifyTheqqs = (id,ACCESSTOKEN,data) => {
//   return ajax({
//     method: 'post',
//     url: '/ashx/usercenter/shmall/UserInfo.ashx',
//     data: {
//       jsonpCallback: "saveInfoCallBack",
//       ACCESSTOKEN,
//       method: 'updateInfo',
//       QQ,
//       act: 'Qq'
//     }
//   }).then(resolve => {
//     return jsonpToJson(resolve.data)
//   })
// }




