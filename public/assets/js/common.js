//退出功能
$('#loginOut').on('click', function() {
        var isconfim = confirm('您确认要退出吗？');
        if (isconfim) {
            $.ajax({
                url: '/logout',
                type: 'post',
                success: function() {
                    location.href = 'login.html';
                },
                error: function(err) {
                    alert(err.message)
                }
            })
        }

    })
    //跳转到修改密码页面
$('#editPassword').on('click', function() {
    location.href = '/admin/password-reset.html';
    console.log(123);
    return false;
})