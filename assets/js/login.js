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
    $('#form-reg').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        $.ajax ({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                // 提交成功后处理代码
                alert(res.message)
            }
        }) 
    })
})