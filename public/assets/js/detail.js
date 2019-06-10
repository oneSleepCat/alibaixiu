//获取热门推荐内容
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(response) {
        var html = template("indexHotTpl", { data: response });
        $("#hotArticle").html(html);
    }
})

var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            var html = template('detailPostsTpl', response);
            $('#detailPostsTplBox').html(html);
        }
    })
}
//发送点赞请求
$('#detailPostsTplBox').on('click', '#likes', function() {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function(response) {
            $('#likesCount').html(response.meta.likes);
            alert('感谢您的支持');
            location.reload();
        }
    })
})
var review;
//获取网站配置信息
$.ajax({
        type: 'get',
        url: '/settings',
        success: function(response) {
            review = response.review;

            if (response.comment) {
                var html = template('detailCommentTpl');
                $('#comment').html(html);
            }
        }
    })
    //添加表单提交事件，提交评论
$('#comment').on('submit', '#detailCommentForm', function() {
    var content = $(this).find('textarea').val();
    var post = id;
    var state;
    if (review) {
        //需要审核
        state = 0;
    } else {
        // 不需要审核
        state = 1;
    }
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content,
            post,
            state
        },
        success: function() {
            alert('评论成功！');
            location.reload();
        },
        error: function() {
            alert('评论失败！');
        }
    })
    return false;
})