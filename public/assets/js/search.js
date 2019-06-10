//获取服务器传递的key
var key = getUrlParams('key');
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(response) {
        console.log(response);
        var html = template('listCommentTpl', { data: response });
        $('#listCategoryTplBox').html(html);
    }
})