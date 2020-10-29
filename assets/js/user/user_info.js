$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6之间"
            }
        }
    })

    // 获取用户信息
    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 把用户信息渲染到form表单中
                // console.log(res)
                // 成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单事件
    $('#btnReset').on('click', function () {
        // 阻止重置
        e.preventDefault()
        // 从新进行用户渲染（赋值）
        initUserInfo()
    })


    // 修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败!")
                }
                layer.msg("恭喜您，用户信息修改成功!")
                // 调用父页面中的更新用户信息和头像的方法
                window.parent.getUserInof()
            }
        })
    })

})