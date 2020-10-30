$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    var layer = layui.layer
    // 剪裁图片
    $('#file').on('change', function (e) {
        // 拿到用户选择的文件，files为伪数组，无论上传多少 files 都是数组
        var file = e.target.files[0]
        // 托片上传非空效验, 强制空的数组输出第一个值，输出 undefined
        if (file == undefined) {
            return layer.msg("请选择图片！")
        }

        // 创建一个对应的 URL  地址
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域


    })


    // 上传头像
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        console.log(dataURL)
        console.log(typeof dataURL)

        //   发送ajax
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您，更换头像成功！")

                window.parent.getUserInof()
            }
        })
    })
})