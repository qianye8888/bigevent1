// 开发环境
var baseURL = "http://ajax.frontend.itheima.net"
// 测试环境
// var baseURL = "http://ajax.frontend.itheima.net"
// 生产环境
// var baseURL = "http://ajax.frontend.itheima.net"

// 拦截所有ajax请求：get/post/ajax
// 处理函数：
$.ajaxPrefilter(function (params) {
    // console.log(params)
    // console.log(params.url)
    params.url = baseURL + params.url
    // console.log(params.url)

})