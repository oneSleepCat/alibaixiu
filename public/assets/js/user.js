//添加用户
$('#userForm').on('submit', function() {
        //获取表单信息
        var formData = $(this).serialize();
        $.ajax({
                type: 'post',
                url: '/users',
                data: formData,
                success: function() {
                    location.reload();
                },
                error: function() {
                    alert('添加用户失败')
                }
            })
            //阻止默认提交行为
        return false;
    })
    //通过事件委托完成，头像显示与上传
$('#editBox').on('change', '#avatar', function() {
        //创建formData对象
        var formData = new FormData();
        // formData.append的第一个参数为自定义属性，图片上传成功后 服务器会返回一个存储着图片上传之后地址的对象，第二个为要上传的对象
        formData.append('avatar', this.files[0]);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            //告诉$.ajax不要解析请求参数
            processData: false,
            // 告诉$.ajax不要设置请求参数的类型
            contentType: false,
            success: function(response) {
                //图片上传成功，success中的参数为图片上传后的地址
                console.log(response)
                $('#preview').attr('src', response[0].avatar);
                $('#hiddenAvatar').val(response[0].avatar)
            }

        })
    })
    //用户列表展示
$.ajax({
        type: 'get',
        url: '/users',
        success: function(data) {
            var html = template('tpl', {
                data
            })
            $('#tbody').html(html);
        }
    })
    //修改用户信息
$('#tbody').on('click', '#edit', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function(response) {
                var html = template('editUserTpl', response);
                $('#editBox').html(html);
            }
        })
    })
    //提交修改用户的信息
$('#editBox').on('submit', '#editUserForm', function() {
        // 获取用户在表单中输入的内容
        var formData = $(this).serialize();
        //  获取id
        var id = $(this).attr('data-id');
        $.ajax({
                type: 'put',
                url: '/users/' + id,
                data: formData,
                success: function(response) {
                    //修改成功，重新加载页面
                    location.reload();
                }
            })
            //阻止表单默认提交
        return false;
    })
    //删除用户
$('#tbody').on('click', '#deleteUser', function() {
        var isDelete = confirm('是否确认删除？');
        if (isDelete) {
            var id = $(this).attr('data-id');
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function(response) {
                    location.reload();
                }
            })
        }
    })
    //设置全选按钮
    //当有多个用户选中时，显示批量删除选项
var selectAll = $('#selectAll');
selectAll.on('change', function() {
    //获取全选按钮的选中状态
    var status = $(this).prop('checked');
    if (status) {
        //显示批量删除按钮
        $('#deleteMany').show();
    } else {
        //隐藏批量删除按钮
        $('#deleteMany').hide();
    }
    //获取所有用户的选择按钮
    $('#tbody').find('input').prop('checked', status)
})
$('#tbody').on('change', '.userStatus', function() {
    //获取所有用户，筛选出选中的用户
    //判断选中用户的数量和所有的用户数量是否一致
    // 一致说明全选
    var inputs = $('#tbody').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }
    if (inputs.filter(':checked').length > 0) {
        //显示批量删除按钮
        $('#deleteMany').show();
    } else {
        //隐藏批量删除按钮
        $('#deleteMany').hide();
    }
})

//批量删除
$('#deleteBox').on('click', '#deleteMany', function() {
    //设置一个空数组，用来存放被选中用户的id
    var arr = [];
    var checkedUser = $('#tbody').find('input').filter(':checked');
    //循环复选框，将复选框上的id添加到数组中
    checkedUser.each(function(index, element) {
        arr.push($(element).attr('data-id'));
    })
    var isDelete = confirm('是否确认删除？');
    if (isDelete) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + arr.join('-'),
            success: function(response) {
                location.reload();
            }
        })
    }
})