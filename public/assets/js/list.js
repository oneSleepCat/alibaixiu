//获取浏览器传递的ID
var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/category/' + id,
        success: function(response) {
            var html = template('listCommentTpl', { data: response });
            $('#listCategoryTplBox').html(html);
        }
    })
}