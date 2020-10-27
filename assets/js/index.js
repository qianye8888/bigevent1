$(function () {
    // 获取用户信息
    getUserInof()
})

// 获取用户信息（封装到入口函数的外面）
// 原因： 后面其他页面也要调用

function getUserInof() {
    // 发送ajax
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 重新登录，因为 token 过期事件12小时 
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            // console.log(res)
            if(res.status !== 0) {
                // return layui.layer.msg("获取用户信息失败！")
                return layui.layer.msg(res.message)
            } 
            // 请求成功
            renderAvatar(res.data)
        }
    })
}

function renderAvatar (user) {
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)

    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic)
        $('.text-avatar').hide()
    } else {
        // 没有头像
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".text-avatar").show().html(text)
    }
}