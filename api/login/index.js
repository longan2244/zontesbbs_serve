import ajax from "../../tool/index.js"


function jsonpToJson(resolve) {
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
}
export const logins = (data) => {
  return ajax({
    method: 'post',
    url: "/ashx/usercenter/shmall/UserInfo.ashx",
    data,
  }).then(resolve => {
    return jsonpToJson(resolve.data)
  })
}


