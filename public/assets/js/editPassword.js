//修改密码
$('#editPasswordForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
            type: 'put',
            url: '/users/password',
            data: formData,
            success: function() {
                //修改成功，重新加载到登录页面，让用户重新登录
                location.href = '/admin/login.html'
            }
        })
        //阻止默认提交行为
    return false;
})