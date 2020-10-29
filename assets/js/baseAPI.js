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


    // 对所需权限的接口配置头信息
    // 必须以my开头才行
    if(params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }  


    // 登录拦截
    // 拦截所有响应，判断身份认证信息
    params.complete =function (res) {
        console.log(res.responseJSON)
        var obj = res.responseJSON
        if(obj.status == 1 && obj.message == "身份认证失败！") {
            // 清空token
            localStorage.removeItem("token")
            // 页面跳转
            location.href = "/login.html"
        }
    }

})