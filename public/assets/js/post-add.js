$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) { //成功的回调函数
        var html = template('articleTpl', { data: response });
        $('#category').html(html);
    }
})

$('#feature').on('change', function() {
    //获取选择的图片文件
    var file = this.files[0];
    // 创建formData实现二进制图片上传
    var formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover);

        }
    })
})

//创建文章
$('#articleForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
            type: 'post',
            url: '/posts',
            data: formData,
            success: function() {
                location.reload();
            }
        })
        //阻止默认提交
    return false;
})

//从浏览器地址栏获取参数
function getUrlParams(name) {
    var params = location.search.substr(1).split('&');
    for (var i = 0; i < params.length; i++) {
        var data = params[i].split('=')[0];
        if (data == name) {
            return params[i].split('=')[1];
        }
    }
    return -1;
}
//获取浏览器地址传递的id
var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(result) { //成功的回调函数
                    response.result = result;
                    var html = template('editArticleTpl', { data: response });
                    $('#editFormBox').html(html)
                }
            })

        }
    })
}

//添加修改表单提交事件
$('#editFormBox').on('submit', '#editArticleForm', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    console.log(id)
    console.log(formData);
    $.ajax({
            type: 'put',
            url: '/posts/' + id,
            data: formData,
            success: function() {
                location.href = '/admin/posts.html';
            }
        })
        //阻止表单默认提交
    return false;
})