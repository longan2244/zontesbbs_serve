import { getProductCars } from "../../api/mian/index.js"
import { jsonpToJson } from "../../tool/jsptojson.js"
let obj = {}
// jsonp转json
function unwrap(jsonp) {
  function unwrapper(param) {
    // console.log(param); 
    obj = param
    return param;
  }
  var f = new Function('getProductCarCallBack', jsonp)
  return f(unwrapper)
}

//获取商超列表
export const getProductCar = async (req, res) => {
  let { data: resolve } = await getProductCars(req.user.accessToken)
  await unwrap(resolve)
  return res.send(obj)
}