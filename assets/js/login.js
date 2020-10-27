$(function () {
    // 1.点击a链接显示隐藏模块
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2. 自定义效验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,"密码必须6-16位，且不能输入空格"
        
        ],
        repwd: function (value) {
           var pwd =  $('.reg-box input[name=password').val()
           if (value !== pwd) {
               return '两次密码输入不一致！'
           }
        }
    })

    // 3.注册
    var layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        $.ajax ({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                // 提交成功后处理代码
                // alert(res.message)
                layer.msg(res.message)
                // 手动切换到登录表单
                $('#link_login').click()
                // 重置form表单
                $('#form-reg')[0].reset()
            }
        }) 
    })

    // 4.登录
    $('#form_login').submit(function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                    // return layer.msg('登录失败')

                }
                // 提供信息，保存token ，跳转页面
                // layer.msg(res.message)
                layer.msg("恭喜您，登录成功！")
                // 保存token, 未来的接口要使用token
                localStorage.setItem('token', res.token)
                // 跳转
                location.href = "/index.html"
            }
        })
    })

})