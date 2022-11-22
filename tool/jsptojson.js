//###########JSONP转JSOP工具
//##########版本：V1.0
export function jsonpToJson(resolve) {
  // console.log(typeof resolve==='Object');
  // console.log(typeof resolve);
  if (typeof resolve == 'object') {
    // console.log('是对象');
    return resolve
  }
  // console.log(typeof resolve);
  // console.log('不是对象');
  try {
    let jsonData = null
    // 下面是对获取到的数据进行处理，把jsonp格式的数据处理成json格式的数据
    if (typeof resolve === 'string') {
      // 返回的是jsonp类型的数据，所以要用正则表达式来匹配截取json数据
      const reg = /^\w+\((\{[^()]+\})\)$/
      const matches = resolve.match(reg)
      // matches匹配到的是数组，数组第一个是所有正则表达式匹配的字符串，第二个是第一个小括号匹配到的字符串
      if (matches) {
        jsonData = JSON.parse(matches[1])
      }
    }
    return jsonData
  } catch (error) {
    return Promise.reject(error)
  }
}

//###########JSONP转JSOP工具
//##########版本：V2.0
export function jsonpToJsonV2(jsonp, jsonpCallback) {
  if (typeof jsonp == 'object') {
    // console.log('是对象');
    return jsonp
  }
  try {
    return new Promise(resolve => {
      function unwrapper(param) {
        resolve(param)
      }
      var f = new Function(jsonpCallback, jsonp)
      return f(unwrapper)
    }).then(resolve => {
      return resolve
    }).catch()
  } catch (error) {
    return Promise.reject(error)
  }
}



{


// // jsonp转json
// function unwrap(jsonp) {
//   function unwrapper(param) {
//     // console.log(param);
//     obj = param
//     return param;
//   }
//   var f = new Function('getProductCarCallBack', jsonp)
//   return f(unwrapper)
// }







// export function jsonpToJsonV2(jsonp, jsonpCallback) {
//   // console.log(jsonp);
//   // console.log(typeof resolve==='Object');
//   // console.log(typeof resolve);
//   if (typeof resolve == 'object') {
//     // console.log('是对象');
//     return jsonp
//   }
//   // jsonp转json
//   return console.log(_unwrap(jsonp, jsonpCallback));
// }
}


