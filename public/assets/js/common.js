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

//获取用户信息
// $.ajax({
//     type: 'get',
//     url: '/login/status',
//     success: function(response) {
//         var id = userId;
//         $.ajax({
//             type: 'get',
//             url: '/users/' + id,
//             success: function(response) {
//                 console.log(response);
//                 $('#usersLogo').attr('src', response.avatar);
//                 $('#userName').html(response.nickName)
//             }
//         })
//     }
// })

$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        $('#usersLogo').attr('src', response.avatar);
        $('#userName').html(response.nickName)
    }

})

//处理时间格式
function formateDate(date) {
    //将传入的时间日期字符串转换成日期对象
    date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return year + "-" + month + "-" + date;
}