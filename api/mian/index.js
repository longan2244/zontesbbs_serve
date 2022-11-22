import ajax from "../../tool/index.js"
import { jsonpToJson } from "../../tool/jsptojson.js"
export const getProductCars = (ACCESSTOKEN) => {
  return ajax({
    method: 'post',
    url: '/ashx/shopmall/products/product.ashx',
    data: {
      jsonpCallback: "getProductCarCallBack",
      method: 'getProductCar',
      ACCESSTOKEN,
    }
  })
    // .then(resolve => {
    //   console.log(resolve.data);
    //   return jsonpToJson(resolve.data)
    // })
}