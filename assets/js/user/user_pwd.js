$(function () {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if(value === $('[name=oldPwd]').val()) {
                return "新旧密码不能相同!";
            }
        },
        rwPwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次新密码输入不一致!";
            }
        }
        

    })


    // 重置密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                layui.layer.msg("修改密码成功!")

                // reset（）只能DOM原生对象可以使用，将表单清空，所以先将ajax改为DOM原生
                $('.layui-form')[0].reset()
            }
        })
    })
})